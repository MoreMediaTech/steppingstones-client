"use client";

import { Check, ChevronsUpDown } from "lucide-react";

// utils
import { cn } from "@lib/utils";

// components
import { Button } from "@components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { FieldValues, UseFormReturn } from "react-hook-form";

export function EmailInputCombobox({
  form,
  emails,
}: {
  form: UseFormReturn<FieldValues>;
  emails: { label: string; value: string }[];
}) {
  return (
    <FormField
      control={form.control}
      name="to"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>To:</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? emails.find((email) => email.value === field.value)?.label
                    : "Select email"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search email..." />
                <CommandEmpty>No email found.</CommandEmpty>
                <CommandGroup>
                  {emails?.map((email) => (
                    <CommandItem
                      value={email.label}
                      key={email.value}
                      onSelect={() => {
                        form.setValue("to", email.value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          email.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {email.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
