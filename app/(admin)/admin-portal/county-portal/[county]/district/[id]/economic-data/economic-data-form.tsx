import { SubmitHandler, UseFormReturn } from "react-hook-form";

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
import { Input } from "@components/ui/input";

// zod schemas
import { PartialEconomicDataSchemaProps } from "@models/District";

interface IEconomicDataFormProps {
  form: UseFormReturn<PartialEconomicDataSchemaProps, any, undefined>;
  onSubmit: SubmitHandler<PartialEconomicDataSchemaProps>;
}

export function EconomicDataForm({ form, onSubmit }: IEconomicDataFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>
                This the title of the economic data that will be displayed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stats</FormLabel>
              <FormControl>
                <Input placeholder="Enter stats" {...field} />
              </FormControl>
              <FormDescription>
                This is the stats of the economic data that will be displayed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a description" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of the economic data that will be displayed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description continued</FormLabel>
              <FormControl>
                <Input placeholder="Continue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a reference name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the reference of the economic data that will be displayed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to Reference</FormLabel>
              <FormControl>
                <Input placeholder="Enter a link" {...field} />
              </FormControl>
              <FormDescription>
                This is the link to the reference of the economic data that will be displayed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
