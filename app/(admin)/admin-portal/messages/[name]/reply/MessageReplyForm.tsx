"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// hooks (Controller)
import useMessagesController from "../use-messages-controller";
import { PartialMessageSchemaProps } from "@models/Messages";

export function MessageReplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageId = searchParams.get("id") as string;
  const [windowSize] = useWindowSize();

  const { form, message, messageType, handleMessageResponse } =
    useMessagesController(undefined, messageId);

  const defaultValues = {
    from: message?.to,
    to: message?.from,
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
    <section
      className="flex flex-col"
      style={{
        height: (windowSize?.innerHeight as number) - 150,
      }}
    >
      <div className="relative  flex w-full items-center justify-between border-b border-primary-dark-100 py-2">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleBack}
            className="border-r border-primary-dark-100 px-4 py-2 text-xl font-semibold"
          >
            <AiOutlineArrowLeft
              fontSize={30}
              fontWeight={500}
              className="text-primary-dark-100 hover:text-primary-light-600 dark:text-primary-light-100"
            />
          </button>
          <div className="px-4 py-2 dark:text-primary-light-100">
            <p className="text-xl font-semibold text-primary-dark-100 dark:text-primary-light-100">
              {message &&
                format(
                  new Date(message?.createdAt as string),
                  "MM/dd/yyyy HH:MM",
                  {
                    locale: enGB,
                  }
                )}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button type="button" onClick={handleBack} className="px-4 py-2">
            discard
          </button>
        </div>
      </div>

      <div className="w-full border border-primary-dark-100 p-2 dark:border-primary-light-100">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleMessageResponse)}
            className="px-2"
          >
            <fieldset className="group space-y-4">
              <FormField
                control={form.control}
                name="from"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      From<span className="text-red">*</span>
                    </FormLabel>
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
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      To<span className="text-red">*</span>
                    </FormLabel>
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

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
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

              <FormField
                control={form.control}
                name="messageType"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Type</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Message type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {messageType?.map((itemValue, index) => {
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
                      This is the type of message you want to send.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write a message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="inline-flex w-full items-center justify-center group-disabled:pointer-events-none"
              >
                <span className="w-full group-disabled:opacity-0">Submit</span>
              </Button>
            </fieldset>
          </form>
        </Form>
      </div>
    </section>
  );
}
