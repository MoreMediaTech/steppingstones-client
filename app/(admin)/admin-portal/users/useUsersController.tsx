'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Role,
  UserSchemaWithIdType,
  partialUserSchema,
  PartialUserSchemaType,
  PartialUserWithIdType,
} from '@models/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
import { SubmitHandler, useForm } from 'react-hook-form'

// redux global state (Model)
import { useGetUsersQuery } from '@global-state/features/user/usersApiSlice'
import { useCreateUserMutation } from 'app/global-state/features/user/usersApiSlice'
import { useUpdateUserMutation } from 'app/global-state/features/user/usersApiSlice'
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from '@app/global-state/helper'

export default function useUsersController(
  defaultValues?: PartialUserSchemaType,
  user?: PartialUserWithIdType
) {
  const [roles] = useState<Role[]>([
    Role.USER,
    Role.SS_EDITOR,
    Role.PARTNER,
    Role.COUNTY_EDITOR,
  ])
  const { data: users, isLoading, refetch } = useGetUsersQuery()
  const { toast } = useToast()
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const form = useForm<PartialUserSchemaType>({
    resolver: zodResolver(partialUserSchema),
  })

  const onSubmit: SubmitHandler<PartialUserSchemaType> = useCallback(
    async (data) => {
      try {
        const response = await createUser(data as UserSchemaWithIdType).unwrap()
        if (response.success) {
          toast({
            title: 'Success!',
            description: response.message,
          })
          refetch()
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            'error' in error ? error.error : JSON.stringify(error.message)
          toast({
            title: 'Error!',
            description: (errMsg as string) || 'Unable create user',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        } else if (isErrorWithMessage(error)) {
          toast({
            title: 'Error!',
            description: error.message,
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        }
      }
    },
    [createUser, refetch]
  )

  useEffect(() => {
    // reset the form when the user changes
    form.reset({ ...defaultValues })
  }, [user])

  const onSubmitUpdate: SubmitHandler<PartialUserSchemaType> = useCallback(
    async (data) => {
      const newData = {
        id: user?.id as string,
        ...data,
      }
      try {
        const response = await updateUser(
          newData as UserSchemaWithIdType
        ).unwrap()
        if (response.success) {
          toast({
            title: 'Success!',
            description: response.message,
          })
          refetch()
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            'error' in error ? error.error : JSON.stringify(error.message)
          toast({
            title: 'Error!',
            description: (errMsg as string) || 'Unable update user',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        } else if (isErrorWithMessage(error)) {
          toast({
            title: 'Error!',
            description: error.message,
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        }
      }
    },
    []
  )

  return {
    users,
    isLoading,
    form,
    roles,
    onSubmit,
    onSubmitUpdate,
  }
}
