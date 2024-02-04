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

import useCountySettingController from "./use-feed-content-setting-controller";

export function CreateCountyForm() {
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    name: "",
  };
  const { form, isCreating, createHandler } = useCountySettingController(
    defaultValues,
    undefined,
    setOpen,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-gray-900 dark:border-gray-200 sm:w-1/3"
        >
          Create County
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create County</DialogTitle>
          <DialogDescription>Create a new county</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              aria-label="county-name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a County Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the county you want to create
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogTrigger>
              <Button type="submit" disabled={isCreating}>
                Submit
              </Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
