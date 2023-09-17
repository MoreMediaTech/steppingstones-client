'use client'

// components
import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'

import useCountySettingController from './use-county-setting-controller'

export function CreateCountyForm() {
  const { form, isCreating, createHandler } = useCountySettingController()

  return (
    <Dialog>
      <Button
        type="button"
        variant="outline"
        asChild
        className=" border-gray-900 dark:border-gray-200 w-1/3"
      >
        <DialogTrigger>Create County</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create County</DialogTitle>
          <DialogDescription>Create a new county</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              aria-label="county-name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a County Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the county you want to create
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogTrigger>
              <Button type="submit" disabled={isCreating}>
                Submit
              </Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
