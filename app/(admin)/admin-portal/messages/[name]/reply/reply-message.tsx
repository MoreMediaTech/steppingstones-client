"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdClose } from "react-icons/md";

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
import { SendIcon } from "@app/icons/send";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// hooks (Controller)
import useMessagesController from "../use-messages-controller";
import { Separator } from "@components/ui/separator";
import { EmailInputCombobox } from "@components/email/email-combobox";

export function ReplyMessage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageId = searchParams.get("id") as string;

  const { form, message, isSendingEmail, handleMessageResponse } =
  useMessagesController(undefined, messageId);

  const defaultValues = {
    from: message?.recipient?.email,
    to: message?.sender?.email,
    subject: message?.subject,
    message: message?.message,
    messageType: message?.messageType,
  };

  useEffect(() => {
    form.reset({ ...defaultValues });
  }, [message]);

  const handleBack = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleMessageResponse)}
        className="w-12/20 col-span-3 flex flex-col"
      >
        <fieldset disabled={isSendingEmail} className="group space-y-4">
          <div className="sticky top-0 flex h-[60px] items-center justify-between border-b border-gray-200 p-2  dark:border-gray-800">
            <Button
              type="submit"
              variant="outline"
              className="inline-flex items-center justify-center group-disabled:pointer-events-none"
            >
              <span className="w-full group-disabled:opacity-0">
                <SendIcon />
              </span>
            </Button>
            <Button
              type="submit"
              variant="ghost"
              className="inline-flex items-center justify-center group-disabled:pointer-events-none"
              onClick={handleBack}
            >
              <span className="w-full group-disabled:opacity-0">
                <MdClose fontSize={30} />
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
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To:</FormLabel>
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
