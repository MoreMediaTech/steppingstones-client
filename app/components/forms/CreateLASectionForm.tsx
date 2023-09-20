'use client'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// components
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

import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/dist/query'


export const createLASectionFormSchema = z.object({
  name: z.string().min(2, {
    message: 'LA Section name must be at least 2 characters',
  }),
  isEconomicData: z.boolean(),
})

export type CreateLASectionFormProps = z.infer<typeof createLASectionFormSchema>

type Props = {
  refetch: () => void
  createSection: MutationTrigger<
    MutationDefinition<
      CreateLASectionFormProps & { districtId: string },
      BaseQueryFn,
      'Editor',
      {
        success: boolean
        message: string
      },
      'editorApi'
    >
  >
  id: string
}

const CreateLASectionForm = ({ refetch, createSection, id }: Props) => {
  const { toast } = useToast()
  const form = useForm<CreateLASectionFormProps>({
    resolver: zodResolver(createLASectionFormSchema),
  })

  const handleClose = () => {
    form.reset()
    refetch()
  }

  const onSubmit: SubmitHandler<CreateLASectionFormProps> = useCallback(
    async (data) => {
      const sectionData = { ...data, districtId: id }

      try {
        await createSection(sectionData).unwrap()
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
        className="w-full border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>Create District Section</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a District LA Section</DialogTitle>
          <DialogDescription>
            Create a section for a new District Local Authority
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
              name="isEconomicData"
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
                      Is this section for economic data collection?
                    </FormLabel>
                    <FormDescription>
                      Create a section for economic data collection
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

export default CreateLASectionForm
