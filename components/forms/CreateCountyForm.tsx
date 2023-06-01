'use client'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { showNotification } from '@mantine/notifications'
import { Button, Modal, TextInput, UnstyledButton } from '@mantine/core'
import { IoMdCloseCircleOutline } from 'react-icons/io'

import { useCreateCountyMutation } from 'app/global-state/features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import { CountyDataProps } from '@lib/types'

type FormDataProps = {
  name: string
}

const CreateDirectoryForm = ({
  opened,
  setOpened,
  refetch,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>()
  const router = useRouter()

  const [createCounty, { isLoading, error }] = useCreateCountyMutation()

  const handleClose = () => {
    reset()
    refetch()
    setOpened(false)
  }

  const submitHandler: SubmitHandler<FormDataProps> = useCallback(
    async (data) => {
      try {
        await createCounty(data as CountyDataProps).unwrap()
        handleClose()
        router.replace(`/admin-portal/county-portal`)
      } catch (error) {
        if (!error?.response) {
          showNotification({
            message: 'No server response',
            autoClose: 3000,
            color: 'red',
          })
        } else if (error.response?.status === 400) {
          showNotification({
            message: 'Invalid input data',
            autoClose: 3000,
            color: 'red',
          })
        } else if (error.response?.status === 401) {
          showNotification({
            message: 'Unauthorized',
            autoClose: 3000,
            color: 'red',
          })
        } else {
          showNotification({
            message: 'Unable to complete request',
            autoClose: 3000,
            color: 'red',
          })
        }
      }
    },
    []
  )
  return (
    <Modal
      centered
      size="md"
      opened={opened}
      onClose={handleClose}
      title="Create a new County"
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="my-4 w-full">
          <TextInput
            id="name"
            aria-label="county-name"
            placeholder="Enter a County Name"
            rightSection={
              <UnstyledButton type="button" onClick={() => reset()}>
                <IoMdCloseCircleOutline />
              </UnstyledButton>
            }
            type="text"
            {...register('name', {
              required: true,
              minLength: {
                value: 2,
                message:
                  'Please enter a County name with at least 2 characters',
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
        <div className="w-full">
          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateDirectoryForm
