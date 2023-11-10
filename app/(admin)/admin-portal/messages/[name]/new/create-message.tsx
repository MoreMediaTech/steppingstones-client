"use client";

import React from "react";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";

// hooks (Controller)
import useMessagesController from "../use-messages-controller";
import { SendIcon } from "@app/icons/send";
import { EmailInputCombobox } from "@components/email/email-combobox";
import { Separator } from "@components/ui/separator";

export function CreateMessage() {
  const { form, emails, isSendingEmail, createMessageHandler } =
    useMessagesController(undefined, undefined);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createMessageHandler)}
        className="w-12/20 col-span-3 flex flex-col"
      >
        <fieldset disabled={isSendingEmail} className="group space-y-4">
          <div className="sticky top-0 flex h-[60px] items-center justify-between border-b border-gray-200 p-2  dark:border-gray-800">
            <Button
              type="submit"
              className="inline-flex items-center justify-center group-disabled:pointer-events-none"
            >
              <span className="w-full group-disabled:opacity-0">
                <SendIcon />
              </span>
            </Button>
          </div>
          <div className="flex-grow space-y-1 overflow-y-auto p-1 text-sm">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-900 dark:border-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-2 w-full" />
            <div className="relative flex flex-col justify-center space-y-2">
              <EmailInputCombobox emails={emails} form={form} />
            </div>
            <Separator className="my-2 w-full" />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-900 dark:border-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-2 w-full" />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a message"
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
