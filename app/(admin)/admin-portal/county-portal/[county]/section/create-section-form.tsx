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
import { Checkbox } from "@components/ui/checkbox";

// hooks (Controller)
import useSectionController, { CreateSectionType } from "./use-section-controller";



type CreateSectionFormProps = {
  type: CreateSectionType;
  id: string;
  btnTitle: string;
};

const CreateSectionForm = ({ type, id, btnTitle }: CreateSectionFormProps) => {
  const { form, createSectionHandler } = useSectionController(undefined, undefined, type, id);

  return (
    <Dialog>
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>{btnTitle}</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Section</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new section
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createSectionHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section name</FormLabel>
                  <FormControl>
                    <Input placeholder="Section name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the section you want to create
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSubSection"
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
                      Is this a sub-section of an existing section?
                    </FormLabel>
                    <FormDescription>
                      Create a new sub-section of an existing section
                    </FormDescription>
                  </div>
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

export default CreateSectionForm;
