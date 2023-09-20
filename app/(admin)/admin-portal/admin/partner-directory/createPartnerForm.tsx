"use client";

import React from "react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { ScrollArea } from "@components/ui/scroll-area";

// hooks (Controller)
import usePartnerDirectoryController from "./use-partner-directory-controller";
import { Checkbox } from "@components/ui/checkbox";

export function CreatePartnerForm() {
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    name: "",
    email: "",
    organisation: "",
    position: "",
    projectsResponsibleFor: "",
    closingDate: "",
    isEmail: false,
  };

  const { form, isCreating, createPartnerHandler } =
    usePartnerDirectoryController(defaultValues, undefined, setOpen);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          type="button"
          asChild
          variant="outline"
          className="w-1/3 border-gray-900 dark:border-gray-200 "
        >
          <DialogTrigger>Create Partner</DialogTrigger>
        </Button>
        <DialogContent className="h-[70vh] sm:min-w-[800px]">
          <DialogHeader>
            <DialogTitle>Create Partner</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new partner
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="w-full p-2">
            <Form {...form}>
              <form
                aria-label="update-partner-form"
                data-testid="update-partner-form"
                onSubmit={form.handleSubmit(createPartnerHandler)}
                className="px-2"
              >
                <fieldset disabled={isCreating} className="group space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    aria-label="name-input"
                    aria-errormessage="name-error"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name of the partner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    aria-label="email-input"
                    aria-errormessage="email-error"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email<span className="text-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter an email"
                            {...field}
                            className="border-gray-900 dark:border-gray-200"
                          />
                        </FormControl>
                        <FormDescription>
                          This is the email address of the partner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organisation"
                    aria-label="organisation-input"
                    aria-errormessage="organisation-error"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organisation</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter an organisation"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is the organisation name of the partner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    aria-label="position-input"
                    aria-errormessage="position-error"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter an position" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the position of the partner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectsResponsibleFor"
                    aria-label="project-input"
                    aria-errormessage="project-error"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsible For - Projects?</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter an project" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the project the partner is responsible for
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="closingDate"
                    aria-label="closing-date-input"
                    aria-errormessage="closing-date-error"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Closing Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Select a Date" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the expected closing date of the project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isEmail"
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
                            Can Email?<span className="text-red">*</span>
                          </FormLabel>
                          <FormDescription>
                            Confirm if the partner can be emailed or not
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="inline-flex w-full items-center justify-center group-disabled:pointer-events-none"
                  >
                    <span className="w-full">Submit</span>
                  </Button>
                </fieldset>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
