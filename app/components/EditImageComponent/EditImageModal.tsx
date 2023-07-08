'use client'
import {  EditImageProps } from '@lib/types'
import React, { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Modal } from '@mantine/core'
import EditImageComponent from './EditImageForm'
import { useUpdateUserMutation } from 'app/global-state/features/user/usersApiSlice'
import { showNotification } from '@mantine/notifications'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

const EditImageModal = ({
  opened,
  setOpened,
  refetch,
  user,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  user: Partial<UserSchemaWithIdAndOrganisationType>
}) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditImageProps>()

  const uploadFileHandler = (file: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.onerror = () => {
      showNotification({
        message: 'something went wrong!',
        autoClose: 3000,
        color: 'red',
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      uploadFileHandler(file)
    }
  }

  const submitHandler: SubmitHandler<EditImageProps> = useCallback(
    async (data) => {
      const updatedImg = {
        id: user?.id,
        imageFile: preview,
      }
      try {
        await updateUser(updatedImg).unwrap()
        setOpened(false)
        setPreview(null)
        refetch()
      } catch (error) {
        showNotification({
          message: 'Something went wrong! Unable to upload Image',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    [preview]
  )
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Image">
      <EditImageComponent
        register={register}
        submitHandler={submitHandler}
        setIsEdit={setOpened}
        errors={errors}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        preview={preview}
        setPreview={setPreview}
        handleChange={handleChange}
      />
    </Modal>
  )
}

export default EditImageModal
