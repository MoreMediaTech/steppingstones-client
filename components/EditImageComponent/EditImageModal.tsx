import { EditImageProps, IFormData } from '@lib/types'
import React, { useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Modal, Button, Group } from '@mantine/core'
import EditImageComponent from './EditImageForm'
import { useUpdateUserMutation } from 'features/user/usersApiSlice'

const EditImageModal = ({
  opened,
  setOpened,
  refetch,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
}) => {
    const [updateUser, { isLoading }] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditImageProps>()

  const submitHandler: SubmitHandler<EditImageProps> = useCallback(
    async (data) => {
      console.log(data)
      setOpened(false)
      refetch()
    },
    []
  )
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Image">
        <EditImageComponent register={register} submitHandler={submitHandler} setIsEdit={setOpened} errors={errors} isLoading={isLoading} handleSubmit={handleSubmit} />
    </Modal>
  )
}

export default EditImageModal
