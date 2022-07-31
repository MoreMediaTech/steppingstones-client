import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { DistrictDataProps, IFormData } from '@lib/types'
import { Button, Checkbox, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useUpdateDistrictByIdMutation } from 'features/editor/editorApiSlice'

const UpdateDistrictForm = ({
  refetch,
  district,
  handleModalClose,
}: {
  refetch: () => void
  district?: DistrictDataProps
  handleModalClose?: () => void
}) => {
  const [updateDistrictById, { isLoading }] = useUpdateDistrictByIdMutation()
  const defaultValues = {
    name: district?.name ? (district?.name as string) : '',
    isLive: district?.isLive ? (district?.isLive as boolean) : false,
    logoFile: district?.logoIcon ? (district?.logoIcon as string) : '',
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
        id: district?.id as string,
        ...data,
      }
      try {
        await updateDistrictById(newData as DistrictDataProps).unwrap()
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
          aria-label="county-name"
          placeholder="Enter a County Name"
          type="text"
          {...register('name', {
            required: true,
            minLength: {
              value: 2,
              message: 'Please enter a County name with at least 2 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid County name',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.name && (
          <span className="text-center text-sm text-red-500">
            {errors.name?.message || 'A valid County name is required'}
          </span>
        )}
      </div>
      <div className="my-4 w-full">
        <Checkbox label="Is Live" {...register('isLive')} />
      </div>
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
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
