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

// zod schemas
import {
  PartialSourceDirectoryProps,
  SourceDirectoryType,
} from "@models/SourceDirectory";

// hooks (Controller)
import useSourceDirectoryController from "./use-source-directory-controller";

export function CreateSourceForm() {
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    type: SourceDirectoryType.BSI,
    category: "",
    description: "",
    webLink: "",
    canEmail: false,
  };
  const { form, isUpdating, types, handleCreate } =
    useSourceDirectoryController(defaultValues, undefined, setOpen);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          type="button"
          asChild
          variant="outline"
          className="w-1/3 border-gray-900 dark:border-gray-200 "
        >
          <DialogTrigger>Create Source</DialogTrigger>
        </Button>
        <DialogContent className="h-[70vh] sm:min-w-[800px]">
          <DialogHeader>
            <DialogTitle>Create Source</DialogTitle>
            <DialogDescription>
              Create a new source for the source directory
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="w-full p-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreate)} className="px-2">
                <fieldset disabled={isUpdating} className="group space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value as SourceDirectoryType)
                          }
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {types?.map((itemValue, index) => {
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
                          This is the type of the source
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a category" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the category of the source
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Description<span className="text-red">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Source Description"
                            {...field}
                            className="border-gray-900 dark:border-gray-200"
                          />
                        </FormControl>
                        <FormDescription>
                          This is the description of the source
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="webLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Web-Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a web-link" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the website link for the source
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="canEmail"
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
                            Email Alerts<span className="text-red">*</span>
                          </FormLabel>
                          <FormDescription>
                            This is the status of the source if it can be
                            emailed
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isUpdating}
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
