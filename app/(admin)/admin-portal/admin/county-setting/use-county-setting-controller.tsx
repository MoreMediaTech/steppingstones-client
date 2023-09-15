'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// redux global state (Model)
import {
  useGetCountiesQuery,
  useRemoveCountyMutation,
  useUpdateCountyMutation,
} from '@global-state/features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'

// zod schema
import { CountySchemaProps, PartialCountySchemaProps, partialCountySchema } from '@models/County';

// components
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
import { isErrorWithMessage, isFetchBaseQueryError } from '@app/global-state/helper';

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  published: z.boolean().optional(),
  logoFile: z.string().optional(),
})

const partialFormSchema = formSchema.partial()

type FormSchemaProps = z.infer<typeof formSchema>

type PartialFormSchemaProps = z.infer<typeof partialFormSchema>


export default function useCountySettingController(defaultValues?: PartialFormSchemaProps, countyId?: string) {
  const { toast } = useToast()
  const router = useRouter()
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const {
    data: counties,
    isLoading: isLoadingCounties,
    refetch: refetchCounties,
  } = useGetCountiesQuery()

  const [removeCounty, { isLoading: isRemoving }] = useRemoveCountyMutation()
  const [updateCounty, { isLoading: isUpdating }] = useUpdateCountyMutation()

  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  })

  useEffect(() => {
    // reset the form when the user changes
    form.reset({ ...defaultValues })
  }, [defaultValues])

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await removeCounty(id).unwrap()
      refetchCounties()
      toast({
        title: 'Success!',
        description: response.message,
      })
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          'error' in error ? error.error : JSON.stringify(error.message)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: (errMsg as string) || 'Login failed. Please try again.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      } else if (isErrorWithMessage(error)) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message || 'Login failed. Please try again.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
  }, [])

  const onChangePicture = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement & { files: FileList }
      const file: File = (target.files as FileList)[0]
      if (typeof file === 'undefined') return

      try {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Unable to upload image.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    []
  )

  const onSubmit: SubmitHandler<FormSchemaProps> = useCallback(
    async (data) => {
      const newData = {
        id: countyId as string,
        logoFile: preview as string,
        name: data.name,
        published: data.published,
      }
      try {
        const response = await updateCounty(newData).unwrap()
        if (response.success) {
          refetchCounties()
          router.replace('/admin-portal/admin/county-setting')
          toast({
            title: 'County updated.',
            description: 'County has been updated.',
          })
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem updating the county.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    [preview, countyId]
  )

  return {
    counties,
    isLoadingCounties,
    refetchCounties,
    deleteHandler,
    isRemoving,
    isUpdating,
    form,
    preview,
    onChangePicture,
    onSubmit,
  }
}