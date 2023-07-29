'use client'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
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

import { useCreateDistrictMutation } from 'app/global-state/features/editor/editorApiSlice'

const addDistrictFormSchema = z.object({
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
})

type AddDistrictFormProps = z.infer<typeof addDistrictFormSchema>

const AddDistrictForm = ({
  countyId,
  county,
  refetch,
}: {
  countyId: string
  county: string
  refetch: () => void
}) => {
  const { toast } = useToast()
  const form = useForm<AddDistrictFormProps>({
    resolver: zodResolver(addDistrictFormSchema),
  })
  const router = useRouter()

  const [createDistrict, { isLoading }] = useCreateDistrictMutation()

  const handleClose = () => {
    form.reset()
    refetch()
  }

  const onSubmit: SubmitHandler<AddDistrictFormProps> = useCallback(
    async (data) => {
      const newData = { ...data, countyId }
      try {
        await createDistrict(newData).unwrap()
        handleClose()
        toast({
          title: 'Success!',
          description: 'District created successfully',
        })
        router.push(
          `/admin-portal/county-portal/${county}?countyId=${countyId}`
        )
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
    []
  )
  return (
    <Dialog>
      <Button type="button" variant='outline' asChild className='w-full border-gray-900 dark:border-gray-200'>
        <DialogTrigger>Add District</DialogTrigger>
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
                  <FormLabel>District name</FormLabel>
                  <FormControl>
                    <Input placeholder="District name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the district that will be displayed
                  </FormDescription>
                  <FormMessage />
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

export default AddDistrictForm
