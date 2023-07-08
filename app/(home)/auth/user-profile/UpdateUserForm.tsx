'use client'
import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IFormData } from '@lib/types'
import { useUpdateUserMutation } from 'app/global-state/features/user/usersApiSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import validator from 'validator'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'

import { Input } from '@components/ui/input'
import { Checkbox } from '@components/ui/checkbox'
import {
  UserSchemaType,
  UserSchema,
  UserSchemaWithIdAndOrganisationType,
  Role,
  UserSchemaWithIdType,
} from '@models/User'




const UpdateUserForm = ({
  refetch,
  user,
  disabled,
}: {
  refetch: () => void
  user?: UserSchemaWithIdAndOrganisationType
  disabled?: boolean
}) => {
  const { toast } = useToast()
  const [roles] = useState<Role[]>([
    Role.USER,
    Role.SS_EDITOR,
    Role.PARTNER,
    Role.COUNTY_EDITOR,
  ])
  const defaultValues: UserSchemaType = {
    name: user?.name ? (user?.name as string) : '',
    email: user?.email ? (user?.email as string) : '',
    contactNumber: user?.contactNumber ? (user?.contactNumber as string) : '',
    postCode: user?.postCode ? (user?.postCode as string) : '',
    district: user?.district ? (user?.district as string) : '',
    county: user?.county ? (user?.county as string) : '',
    organisation: user?.organisation?.name
      ? (user?.organisation?.name as string)
      : '',
    role: user?.role ? (user?.role as Role) : Role.USER,
    emailVerified: user?.emailVerified
      ? (user?.emailVerified as boolean)
      : false,
    isAdmin: user?.isAdmin ? (user?.isAdmin as boolean) : false,
    acceptTermsAndConditions: user?.acceptTermsAndConditions
      ? (user?.acceptTermsAndConditions as boolean)
      : false,
  }

 

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: { ...defaultValues },
  })
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    // reset the form when the user changes
    form.reset({ ...defaultValues })
  }, [user])

  const onSubmit: SubmitHandler<UserSchemaType> = useCallback(
    async (data) => {
      const newData = {
        id: user?.id as string,
        ...data,
      }
      try {
        await updateUser(newData as UserSchemaWithIdType).unwrap()
        refetch()
        toast({
          title: 'User updated',
          description: 'User updated successfully',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    []
  )

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
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
                <FormLabel>
                  Email<span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email address"
                    {...field}
                    className="border-gray-900 dark:border-gray-200"
                  />
                </FormControl>
                <FormDescription>
                  Please enter your email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    pattern="[0-9]{11}"
                    placeholder="Your contact number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the contact number that will be displayed on your
                  profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    pattern="[A-Za-z]{1,2}[0-9]{1,2} ?[0-9][A-Za-z]{2}"
                    placeholder="Your post code"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the post code that will be displayed on your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input placeholder="Your district" {...field} />
                </FormControl>
                <FormDescription>
                  This is your local district that will be displayed on your
                  profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="county"
            render={({ field }) => (
              <FormItem>
                <FormLabel>County</FormLabel>
                <FormControl>
                  <Input placeholder="Your county" {...field} />
                </FormControl>
                <FormDescription>
                  This is your local county that will be displayed on your
                  profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation</FormLabel>
                <FormControl>
                  <Input placeholder="Your organisation" {...field} />
                </FormControl>
                <FormDescription>
                  This is your organisation that will be displayed on your
                  profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Role</FormLabel>
                <Select
                  disabled={disabled}
                  onValueChange={(value) => field.onChange(value as Role)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles?.map((itemValue, index) => {
                      return (
                        <SelectItem
                          key={`${index} + ${itemValue}`}
                          value={itemValue}
                        >
                          {itemValue}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is the role that will be displayed on your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAdmin"
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
                    Admin<span className="text-red">*</span>
                  </FormLabel>
                  <FormDescription>
                    This is the role that will be displayed on your profile
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailVerified"
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
                    Email Verified<span className="text-red">*</span>
                  </FormLabel>
                  <FormDescription>
                    This confirms that you have verified your email address
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTermsAndConditions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    disabled={disabled}
                    checked={field.value}
                    onCheckedChange={(event) =>
                      field.onChange(event as boolean)
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept Terms & Conditions</FormLabel>
                  <FormDescription>
                    This confirms that you have read and accept the terms and
                    conditions.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

export default UpdateUserForm
