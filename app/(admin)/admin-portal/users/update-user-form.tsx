"use client";

import React from "react";
import { Pen } from "lucide-react";

// components
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { ScrollArea } from "@components/ui/scroll-area";
import Loader from "@components/Loader";

// zod schemas
import { Role, PartialUserWithIdType } from "@models/User";

// hooks (Controller)
import useUsersController from "./use-users-controller";

type Props = {
  user?: PartialUserWithIdType;
  disabled?: boolean;
};

export function UpdateUserForm({ user, disabled }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    name: user?.name ? (user?.name as string) : "",
    email: user?.email ? (user?.email as string) : "",
    contactNumber: user?.contactNumber ? (user?.contactNumber as string) : "",
    postCode: user?.postCode ? (user?.postCode as string) : "",
    district: user?.district ? (user?.district as string) : "",
    county: user?.county ? (user?.county as string) : "",
    organisation: user?.organisation?.name
      ? (user?.organisation?.name as string)
      : "",
    role: user?.role ? (user?.role as Role) : Role.USER,
    emailVerified: user?.emailVerified
      ? (user?.emailVerified as boolean)
      : false,
    isAdmin: user?.isAdmin ? (user?.isAdmin as boolean) : false,
    isSuperAdmin: user?.isSuperAdmin ? (user?.isSuperAdmin as boolean) : false,
    isDisabled: user?.isDisabled ? (user?.isDisabled as boolean) : false,
    acceptTermsAndConditions: user?.acceptTermsAndConditions
      ? (user?.acceptTermsAndConditions as boolean)
      : false,
  };

  const { form, roles, isUpdating, onSubmitUpdate } = useUsersController(
    defaultValues,
    user,
    setOpen,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        asChild
        variant="ghost"
        className="w-full border-gray-900 dark:border-gray-200 "
      >
        <DialogTrigger>
          <Pen className="mr-2 h-3.5 w-3.5 " />
          Edit
        </DialogTrigger>
      </Button>
      <DialogContent className="h-[70vh] sm:max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Update User Details</DialogTitle>
          <DialogDescription>Update the details of the user</DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitUpdate)} className="px-2">
              <fieldset disabled={isUpdating} className="group space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name that will be displayed on your profile
                        and in emails.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email<span className="text-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          {...field}
                          className="border-gray-900 dark:border-gray-200"
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your email address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          pattern="[0-9]{11}"
                          placeholder="Your contact number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the contact number that will be displayed on
                        your profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          pattern="[A-Za-z]{1,2}[0-9]{1,2} ?[0-9][A-Za-z]{2}"
                          placeholder="Your post code"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the post code that will be displayed on your
                        profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder="Your district" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your local district that will be displayed on
                        your profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="county"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>County</FormLabel>
                      <FormControl>
                        <Input placeholder="Your county" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your local county that will be displayed on your
                        profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organisation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Your organisation" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your organisation that will be displayed on your
                        profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role</FormLabel>
                      <Select
                        disabled={disabled}
                        onValueChange={(value) => field.onChange(value as Role)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles?.map((itemValue, index) => {
                            return (
                              <SelectItem
                                key={`${index} + ${itemValue}`}
                                value={itemValue}
                              >
                                {itemValue}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is the role that will be displayed on your profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isAdmin"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(event) =>
                            field.onChange(event as boolean)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Admin<span className="text-red">*</span>
                        </FormLabel>
                        <FormDescription>
                          This is the role that will be displayed on your
                          profile
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isSuperAdmin"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(event) =>
                            field.onChange(event as boolean)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Super Admin<span className="text-red">*</span>
                        </FormLabel>
                        <FormDescription>
                          This is to provide an admin with super admin
                          privileges
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isDisabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(event) =>
                            field.onChange(event as boolean)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Disabled<span className="text-red">*</span>
                        </FormLabel>
                        <FormDescription>
                          This is to disable the user from accessing the system
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailVerified"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          disabled
                          checked={field.value}
                          onCheckedChange={(event) =>
                            field.onChange(event as boolean)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Email Verified<span className="text-red">*</span>
                        </FormLabel>
                        <FormDescription>
                          This confirms that you have verified your email
                          address
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acceptTermsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          disabled={disabled}
                          checked={field.value}
                          onCheckedChange={(event) =>
                            field.onChange(event as boolean)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accept Terms & Conditions</FormLabel>
                        <FormDescription>
                          This confirms that you have read and accept the terms
                          and conditions.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="inline-flex w-full items-center justify-center group-disabled:pointer-events-none"
                >
                  {isUpdating ? (
                    <>
                      <Loader className="mr-2 h-6 w-6" />
                      <span className="w-full group-disabled:opacity-0">
                        Submitting...
                      </span>
                    </>
                  ) : (
                    <span className="w-full group-disabled:opacity-0">
                      Submit
                    </span>
                  )}
                </Button>
              </fieldset>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
