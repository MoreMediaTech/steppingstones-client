"use client";

import React from "react";
import { FaFolderPlus } from "react-icons/fa";

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

// hooks
import useMessagesController from "@app/(admin)/admin-portal/messages/[name]/use-messages-controller";

export default function CreateFolderModal() {
  const { handleCreateFolder, open, setOpen, form, isCreating } =
    useMessagesController({ folderName: "" }, undefined);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          type="button"
          asChild
          variant="ghost"
          className=" inline-flex border-gray-900 dark:border-gray-200"
        >
          <DialogTrigger>
            <FaFolderPlus fontSize={24} />
          </DialogTrigger>
        </Button>
        <DialogContent className=" sm:min-w-[800px]">
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new folder
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="w-full p-2">
            <Form {...form}>
              <form
                aria-label="update-partner-form"
                data-testid="update-partner-form"
                onSubmit={form.handleSubmit(handleCreateFolder)}
                className="px-2"
              >
                <fieldset disabled={isCreating} className="group space-y-4">
                  <FormField
                    control={form.control}
                    name="folderName"
                    aria-label="folder-name-input"
                    aria-errormessage="name-error"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Folder name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name of the folder you want to create
                        </FormDescription>
                        <FormMessage />
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
