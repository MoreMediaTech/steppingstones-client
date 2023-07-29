'use client'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
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


import { Checkbox } from '@components/ui/checkbox'

const createSectionFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'District name must be at least 2 characters',
    })
    .regex(/^[a-zA-Z0-9!@#$%^&*()._ -]+$/, {
      message:
        'District name can only contain letters, numbers, and special characters',
    })
    .nonempty({ message: 'District name is required' }),
  isSubSection: z.boolean(),
})

type CreateSectionFormProps = z.infer<typeof createSectionFormSchema>


const CreateSectionForm = ({
  refetch,
  id,
  createSection,
}: {
  id: string
  refetch: () => void
  createSection: any
}) => {
  const { toast } = useToast()
  const form = useForm<CreateSectionFormProps>({
    resolver: zodResolver(createSectionFormSchema),
  })

  const handleClose = () => {
    form.reset()
    refetch()
  }

  const onSubmit: SubmitHandler<CreateSectionFormProps> = useCallback(
    async (data) => {
      const sectionData = { ...data, id }

      try {
        const response = await createSection(sectionData).unwrap()
        toast({
          title: 'Success!',
          description: response.message,
        })
        handleClose()
      } catch (error) {
        if (!error?.response) {
          toast({
            title: 'Error!',
            description: 'Unable to complete request',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        } else if (error.response?.status === 400) {
          toast({
            title: 'Error!',
            description: 'Invalid Input Provided',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        } else if (error.response?.status === 401) {
          toast({
            title: 'Error!',
            description: 'Unauthorized action',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        } else {
          toast({
            title: 'Error!',
            description: 'Unable to complete request',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        }
      }
    },
    [id]
  )
  return (
    <Dialog>
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full sm:w-1/3 border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>Create Section</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new District</DialogTitle>
          <DialogDescription>
            Please fill in the form below to create a new district
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section name</FormLabel>
                  <FormControl>
                    <Input placeholder="Section name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the section you want to create
                  </FormDescription>
                  <FormMessage />
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
                      disabled
                      checked={field.value}
                      onCheckedChange={(event) =>
                        field.onChange(event as boolean)
                      }
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Is this a sub-section of an existing section?
                    </FormLabel>
                    <FormDescription>
                      Create a new sub-section of an existing section
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <DialogTrigger>
              <Button type="submit">Submit</Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSectionForm
