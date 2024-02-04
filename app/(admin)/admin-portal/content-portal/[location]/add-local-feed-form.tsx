"use client";
import React, { useCallback } from "react";

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

import useContentController from "../use-content-controller";

const AddLocalFeedForm = ({
  contentId,
  location,
}: {
  contentId: string;
  location: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const { form, createLocalFeedContentHandler } = useContentController(
    contentId,
    undefined,
    setOpen,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>Add Local Feed</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new {location} local feed content</DialogTitle>
          <DialogDescription>
            Please fill in the form below to create a new local feed content
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createLocalFeedContentHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feed name</FormLabel>
                  <FormControl>
                    <Input placeholder="District name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the feed content that will be displayed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogTrigger>
              <Button type="submit">Submit</Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLocalFeedForm;
