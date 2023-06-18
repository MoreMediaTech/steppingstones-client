'use client'
import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useTheme } from 'next-themes'

import FormRowSelect from 'app/components/forms/FormComponents/FormRowSelect'
import FormInput from 'app/components/forms/FormComponents/FormInput'
import { IFormDataProps } from './SourceDirectory'
import Button from 'app/components/Button'
import FormCheckbox from '../../../../components/forms/FormComponents/FormCheckBox'
import {
  useCreateSDDataMutation,
  useUpdateSDDataMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { useAppSelector } from 'app/global-state/hooks'
import { editorSelector } from 'app/global-state/features/editor/editorSlice'
import { showNotification } from '@components/mantine-components'
import { SourceDirectoryType } from '@lib/types'

interface ISearchFormProps {
  action: string
  types: string[]
  refetch: () => void
  handleClose: () => void
}

export function SourceDirectoryForm({
  action,
  types,
  refetch,
  handleClose,
}: ISearchFormProps) {
  const { sdData } = useAppSelector(editorSelector)
  const { resolvedTheme } = useTheme()
  const [createSDData, { isLoading: isCreating }] = useCreateSDDataMutation()
  const [updateSDData, { isLoading: isUpdating }] = useUpdateSDDataMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormDataProps>()

  useEffect(() => {
    if (action === 'Create') {
      reset({
        type: SourceDirectoryType.BSI,
        category: '',
        description: '',
        webLink: '',
        canEmail: false,
      })
    }
    if (action === 'Update') {
      reset({
        type: sdData?.type,
        category: sdData?.category,
        description: sdData?.description,
        webLink: sdData?.webLink,
        canEmail: sdData?.canEmail,
      })
    }
  }, [action])

  const submitHandler: SubmitHandler<IFormDataProps> = useCallback(
    async (data) => {
      try {
        let response
        if (action === 'Create') {
          response = await createSDData(data).unwrap()
        } else if (action === 'Update') {
          const updatedData = { id: sdData?.id, ...data }
          response = await updateSDData(updatedData).unwrap()
        }
        refetch()
        reset()
        handleClose()
        showNotification({
          message: response?.message ?? 'Section added successfully',
          color: 'green',
          autoClose: 3000,
        })
      } catch (error) {
        showNotification({
          message: 'Error adding section',
          color: 'red',
          autoClose: 3000,
        })
      }
    },
    []
  )

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative mx-2  mt-5 w-full p-2 font-poppins md:mx-auto md:p-4">
        <div className="grid grid-cols-1 gap-2">
          <FormRowSelect
            label="Source Type"
            type="type"
            {...register('type')}
            list={types}
          />
          <FormInput
            label="Category"
            title="category"
            type="text"
            {...register('category')}
            errors={errors?.category}
            resolvedTheme={resolvedTheme}
          />
          <FormInput
            label="Description"
            type="text"
            title="description"
            {...register('description')}
            errors={errors?.description}
            resolvedTheme={resolvedTheme}
          />
          <FormInput
            label="Web-Link"
            type="text"
            title="web-link"
            {...register('webLink', {
              pattern: {
                value:
                  /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                message: 'Please enter a valid website link',
              },
            })}
            errors={errors?.webLink}
            resolvedTheme={resolvedTheme}
          />
          <FormCheckbox
            label="Email Alerts"
            type="canEmail"
            classes="sm:mt-2 sm:ml-2"
            {...register('canEmail')}
          />

          <Button
            type="submit"
            className="h-10 sm:mt-4"
            color="primary"
            disabled={action === 'CREATE' ? isCreating : isUpdating}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}
