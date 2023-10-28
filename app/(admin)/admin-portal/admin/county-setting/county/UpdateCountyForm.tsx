"use client";

import React from "react";
import { useRef } from "react";
import Image from "next/image";

// components
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
import { Button } from "@components/ui/button";

// hooks (Controller)
import useCountySettingController from "./use-county-setting-controller";

// zod schemas
import { CountySchemaProps } from "@models/County";

type Props = {
  buttonTitle: React.ReactNode;
  county: CountySchemaProps | null;
};

export function UpdateCountyForm({ county, buttonTitle }: Props) {
  const [open, setOpen] = React.useState(false);
  const defaultValues = {
    name: county?.name ? (county?.name as string) : "",
    published: county?.published ? (county?.published as boolean) : false,
  };
  const { form, updateHandler, preview, onChangePicture } =
    useCountySettingController(defaultValues, county?.id, setOpen);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="ghost"
        asChild
        className="flex w-full items-center justify-start border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>{buttonTitle}</DialogTrigger>
      </Button>
      <DialogContent className=" w-[60vw]">
        <DialogHeader>
          <DialogTitle>Update County Details</DialogTitle>
          <DialogDescription>Update the county details below</DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full p-2">
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(updateHandler)}
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
              <div className=" w-full">
                {preview ? (
                  <Image
                    src={preview as string}
                    alt="preview"
                    width={250}
                    height={250}
                  />
                ) : null}
              </div>
              <FormField
                control={form.control}
                name="logoFile"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        {...field}
                        onChange={onChangePicture}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload an image to be used.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
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
                        Publish<span className="text-red">*</span>
                      </FormLabel>
                      <FormDescription>
                        This will publish the county to the public
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                asChild
                className="w-full"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.dispatchEvent(
                      new Event("submit", { bubbles: true })
                    );
                  }
                }}
              >
                <DialogTrigger>Update</DialogTrigger>
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
