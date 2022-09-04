import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import {
  Button,
  Checkbox,
  Modal,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { IoMdCloseCircleOutline } from 'react-icons/io'

type FormDataProps = {
  name: string
  isEconomicData: boolean
}

const CreateLASectionForm = ({
  opened,
  setOpened,
  refetch,
  createSection,
  isLoading,
  id,
}: {
  opened: boolean
  isLoading: boolean
  createSection: any
  id: string
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

  const handleClose = () => {
    reset()
    refetch()
    setOpened(false)
  }

  const submitHandler: SubmitHandler<FormDataProps> = useCallback(
    async (data) => {
      const sectionData = { ...data, districtId: id }

      try {
        await createSection(sectionData).unwrap()
        handleClose()
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
    [id]
  )
  return (
    <Modal
      centered
      size="md"
      opened={opened}
      onClose={handleClose}
      title="Create a new Section"
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="my-4 w-full">
          <TextInput
            id="la-sectionName"
            aria-label="LA Section name"
            placeholder="Enter a LA Section Name"
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
                  'Please enter an LA Section name with at least 2 characters',
              },
            })}
            className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
          />
          {errors.name && (
            <span className="text-center text-sm text-red-500">
              {errors.name?.message || 'A valid Section name is required'}
            </span>
          )}
        </div>
        <div className="flex w-full items-center space-x-4 sm:my-4">
          <input
            id="economic-data"
            aria-label="Economic Data"
            type="checkbox"
            {...register('isEconomicData')}
            className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
          />
          <label className="my-2 text-sm font-semibold text-gray-900">
            Select if this is an Economic Data Section
          </label>
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

export default CreateLASectionForm
