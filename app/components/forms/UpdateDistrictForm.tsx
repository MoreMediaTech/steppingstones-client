'use client'
import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  DistrictDataProps,
  DistrictSectionProps,
  IFormData,
  SectionProps,
} from '@lib/types'
import { Button, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
  useUpdateDistrictByIdMutation,
  useUpdateDistrictSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { ContentFormProps } from '@models/ContentForm'

const UpdateDistrictForm = ({
  refetch,
  dataParams,
  handleModalClose,
  type,
}: {
  type: string
  refetch: () => void
  dataParams?: DistrictDataProps | SectionProps
  handleModalClose?: () => void
}) => {
  const [updateDistrictById, { isLoading }] = useUpdateDistrictByIdMutation()
  const [updateDistrictSectionById, { isLoading: isLoadingLASection }] =
    useUpdateDistrictSectionByIdMutation()

  const defaultValues = {
    name: dataParams?.name ? (dataParams?.name as string) : '',
    isLive: dataParams?.isLive ? (dataParams?.isLive as boolean) : false,
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
      const newData = {
        id: dataParams?.id as string,
        ...data,
      }
      try {
        if (type === 'District') {
          await updateDistrictById(newData as DistrictDataProps).unwrap()
        }
        if (type === 'DistrictSection') {
          await updateDistrictSectionById(
            newData as ContentFormProps & { id: string }
          ).unwrap()
        }
        refetch()
        handleModalClose!()
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
          aria-label="district-name"
          placeholder="Enter a District Name"
          type="text"
          {...register('name')}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.name && (
          <span className="text-center text-sm text-red-500">
            {errors.name?.message || 'A valid District name is required'}
          </span>
        )}
      </div>
      <div className="flex w-full items-center space-x-4 sm:my-8">
        <input
          type="checkbox"
          {...register('isLive')}
          className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
        />
        <label className="my-2 text-sm font-semibold text-gray-900">
          Is Live?
        </label>
      </div>
      <div className="w-full">
        <Button
          type="submit"
          loading={type === 'District' ? isLoading : isLoadingLASection}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Updating......' : 'Update LA'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateDistrictForm
