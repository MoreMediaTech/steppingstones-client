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

import useDistrictController from "./use-district-controller";

type Props = {
  id: string;
};

export function CreateLASectionForm({ id }: Props){
  const [open, setOpen] = React.useState(false);

  const { form, onSubmit } = useDistrictController(id, undefined, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>Create District Section</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a District LA Section</DialogTitle>
          <DialogDescription>
            Create a section for a new District Local Authority
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="isEconomicData"
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
                      Is this section for economic data collection?
                    </FormLabel>
                    <FormDescription>
                      Create a section for economic data collection
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

