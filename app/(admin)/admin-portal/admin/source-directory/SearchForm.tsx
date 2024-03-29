"use client";

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

// zod schemas
import { SourceDirectoryType } from "@models/SourceDirectory";

// hooks (Controller)
import useSourceDirectoryController from "./use-source-directory-controller";

const SearchForm = () => {
  const defaultValues = {
    type: SourceDirectoryType.BSI,
  };
  const { form, types } = useSourceDirectoryController(defaultValues, undefined, undefined);
  return (
    <div className="relative mx-2  mt-5  font-poppins dark:text-gray-100 md:mx-auto ">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="w-full space-y-2">
          <Form {...form}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Type</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value as SourceDirectoryType)
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types?.map((itemValue, index) => {
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
                    This is the type of the source
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <div className="font-poppins text-gray-400 dark:text-gray-100">
            <h3 className="text-semi-bold">Source Types Descriptions</h3>
            <ul className="max-w-md list-disc list-inside dark:text-gray-400 space-y-1 text-xs text-gray-400">
              <li>BSI - Business Support Information</li>
              <li>IS - Industry Sector</li>
              <li>EU - Economic Update</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
