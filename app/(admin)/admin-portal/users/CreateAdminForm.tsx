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

// hooks (Controller)
import useUsersController from "./useUsersController";

export function CreateAdminForm() {
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    name: "",
    email: "",
  };
  const { form, isCreating, onSubmit } = useUsersController(
    defaultValues,
    undefined,
    setOpen
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full border-gray-900 dark:border-gray-200 sm:w-1/3"
      >
        <DialogTrigger>Create Admin User</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Admin user</DialogTitle>
          <DialogDescription>
            Create an admin user for the platform
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter users name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the user you want to create
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter users email address" {...field} />
                  </FormControl>
                  <FormDescription>
                    The email address of the user you want to create
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isCreating} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
