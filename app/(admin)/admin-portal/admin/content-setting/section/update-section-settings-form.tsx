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

// hooks (Controller)
import useSectionSettingController from "./use-section-setting-controller";

// zod schema
import { PartialSectionSchemaProps } from "@models/Section";

export function UpdateSectionSettingsForm({
  data,
}: {
  data: PartialSectionSchemaProps;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    name: data?.name ? (data?.name as string) : "",
    isLive: data?.isLive ? (data?.isLive as boolean) : false,
    isSubSection: data?.isSubSection ? (data?.isSubSection as boolean) : false,
    isEconomicData: data?.isEconomicData
      ? (data?.isEconomicData as boolean)
      : false,
  };

  const { form, handleUpdate } = useSectionSettingController(
    defaultValues,
    data,
    setOpen,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full items-center justify-start border-gray-900 px-4 py-2 dark:border-gray-200">
        <Pen className="mr-2 h-3.5 w-3.5 " />
        Edit
      </DialogTrigger>

      <DialogContent className=" sm:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Update User Details</DialogTitle>
          <DialogDescription>Update the details of the user</DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full p-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-6 px-2"
            >
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
                name="isLive"
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
                        Live<span className="text-red">*</span>
                      </FormLabel>
                      <FormDescription>
                        This is the status of the district if it is live or not.
                      </FormDescription>
                    </div>
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
                        checked={field.value}
                        onCheckedChange={(event) =>
                          field.onChange(event as boolean)
                        }
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>is Sub Section?</FormLabel>
                      <FormDescription>
                        Create a new sub-section of an existing section or
                        section with a sub section
                      </FormDescription>
                    </div>
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

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
