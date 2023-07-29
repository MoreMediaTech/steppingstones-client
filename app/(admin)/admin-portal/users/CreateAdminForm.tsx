'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { useTheme } from 'next-themes'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'
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
import { useCreateUserMutation } from 'app/global-state/features/user/usersApiSlice'

interface ICreateAdminProps {
  refetch: () => void
}

export function CreateAdminForm({ refetch }: ICreateAdminProps) {
  const { toast } = useToast()
  const [createUser] = useCreateUserMutation()
  const form = useForm<Partial<UserSchemaWithIdAndOrganisationType>>()

  const onSubmit: SubmitHandler<Partial<UserSchemaWithIdAndOrganisationType>> =
    useCallback(
      async (data) => {
        try {
          const response = await createUser(
            data as UserSchemaWithIdAndOrganisationType
          ).unwrap()
          if (response.success) {
            toast({
              title: 'Success!',
              description: 'User created successfully',
            })
            refetch()
          }
        } catch (error) {
          toast({
            title: 'Error!',
            description: 'Unable to complete request',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        }
      },
      [createUser, refetch]
    )
  return (
    <Dialog>
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full border-gray-900 dark:border-gray-200 sm:w-1/3"
      >
        <DialogTrigger>Create Admin User</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Admin user</DialogTitle>
          <DialogDescription>
            Create an admin user for the platform
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter users email address" {...field} />
                  </FormControl>
                  <FormDescription>
                    The email address of the user you want to create
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
