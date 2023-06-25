'use client'
import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SectionProps, IFormData, SubSectionProps } from '@lib/types'
import { Button, Checkbox, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
  useUpdateSectionByIdMutation,
  useUpdateSubSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'

const UpdateSectionForm = ({
  sectionData,
  type,
  refetch,
  handleModalClose,
}: {
  type?: 'Section' | 'SubSection'
  sectionData?: SubSectionProps | SectionProps
  refetch: () => void
  handleModalClose?: () => void
}) => {
  const [updateSectionById, { isLoading }] = useUpdateSectionByIdMutation()
  const [updateSubSectionById, { isLoading: isLoadingSubSection }] =
    useUpdateSubSectionByIdMutation()
  const defaultValues = {
    name: sectionData?.name ? (sectionData?.name as string) : '',
    isLive: sectionData?.isLive ? (sectionData?.isLive as boolean) : false,
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: { ...defaultValues },
  })

  useEffect(() => {
    // reset the form when the user changes
    reset({ ...defaultValues })
  }, [])

  const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(
    async (data) => {
      const newData = { id: sectionData?.id, ...data }
      let response
      try {
        if (type === 'Section') {
          response = await updateSectionById(newData as SectionProps).unwrap()
        } else if (type === 'SubSection') {
          response = await updateSubSectionById(
            newData as SubSectionProps
          ).unwrap()
        }
        refetch()
        handleModalClose!()
        showNotification({
          message: response?.message ?? 'Section updated successfully',
          color: 'green',
          autoClose: 3000,
        })
      } catch (error) {
        showNotification({
          message: 'Something went wrong! Please try again',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    []
  )

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="my-4 w-full">
        <TextInput
          id="name"
          aria-label="county-name"
          placeholder="Enter a County Name"
          type="text"
          {...register('name')}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.name && (
          <span className="text-center text-sm text-red-500">
            {errors.name?.message || 'A valid County name is required'}
          </span>
        )}
      </div>
      <div className="flex w-full items-center space-x-4 sm:my-4">
        <input
          type="checkbox"
          {...register('isLive')}
          className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
        />
        <label className="my-2 text-sm font-semibold text-gray-900">
          Is Section Live?
        </label>
      </div>
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Updating......' : 'Update Section'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateSectionForm