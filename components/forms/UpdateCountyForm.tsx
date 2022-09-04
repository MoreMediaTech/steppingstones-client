import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CountyDataProps, IFormData } from '@lib/types'
import { Button, Checkbox, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useUpdateCountyMutation } from 'features/editor/editorApiSlice'

const UpdateCountyForm = ({
  refetch,
  county,
  handleModalClose,
}: {
  refetch: () => void
  county?: CountyDataProps
  handleModalClose?: () => void
}) => {
  const [updateCounty, {isLoading}] = useUpdateCountyMutation()
  const defaultValues = {
    name: county?.name ? (county?.name as string) : '',
    published: county?.published ? (county?.published as boolean) : false,
    logoFile: county?.logoIcon ? (county?.logoIcon as string) : '',
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
        id: county?.id as string,
        ...data,
      }
      try {
        await updateCounty(newData as CountyDataProps).unwrap()
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
          {...register('published')}
          className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
        />
        <label className="my-2 text-sm font-semibold text-gray-900">
          Published?
        </label>
      </div>
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Updating......' : 'Update County'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateCountyForm
