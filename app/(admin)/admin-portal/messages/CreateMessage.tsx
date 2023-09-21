"use client";
import React from "react";

// components

import AutoComplete from "./AutoComplete";
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
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { Textarea } from "@components/ui/textarea";

// hooks (Controller)
import useMessagesController from "./use-messages-controller";
import { MailPlus, MessageSquare } from "lucide-react";

export function CreateMessage() {
  const [open, setOpen] = React.useState(false);

  const {
    form,
    emails,
    isSendingEmail,
    isSendingInAppMsg,
    messageType,
    createMessageHandler,
    suggestionClickedHandler,
  } = useMessagesController(undefined, undefined, setOpen);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          type="button"
          asChild
          variant="outline"
          className="w-1/3 flex items-center border-gray-900 dark:border-gray-200 "
        >
          <DialogTrigger>
            <MailPlus className="mr-2 h-3.5 w-3.5 " />
            New Message
          </DialogTrigger>
        </Button>
        <DialogContent className="h-[70vh] w-[60vw]">
          <DialogHeader>
            <DialogTitle>Update User Details</DialogTitle>
            <DialogDescription>
              Update the details of the user
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="w-full p-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(createMessageHandler)}
                className="px-2"
              >
                <fieldset
                  disabled={isSendingEmail || isSendingInAppMsg}
                  className="group space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="from"
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
                  <AutoComplete
                    suggestions={emails || []}
                    handleSuggestionClick={suggestionClickedHandler}
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
                    name="type"
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
                    <span className="w-full group-disabled:opacity-0">
                      Submit
                    </span>
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
