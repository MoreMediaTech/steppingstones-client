import React, { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Modal } from '@mantine/core'

import { useCreateUserMutation } from 'features/user/usersApiSlice'
import { CurrentUser, EditImageProps, IFormData } from '@lib/types'
import CreateAdminForm from '@components/forms/CreateAdminForm'
import { generatePass } from '@lib/generatePass'

const CreateAdminModal = ({
  opened,
  setOpened,
  refetch,
  user,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  user: CurrentUser
}) => {
  const [password, setPassword] = useState<string>('')
  const [createUser, { isLoading }] = useCreateUserMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<CurrentUser>>({
    defaultValues: { passwordInput: password },
  })

  useEffect(() => {
    // update the password field with the password when generatePassword is called
    reset({ passwordInput: password })
  }, [password])

  const generatePassword = useCallback(() => {
    const password = generatePass(12)
    setPassword(password)
  }, [])

  const submitHandler: SubmitHandler<Partial<CurrentUser>> = useCallback(
    async (data) => {
      try {
        await createUser(data as CurrentUser).unwrap()
        refetch()
        setOpened(false)
        setPassword('')
      } catch (error) {
        showNotification({
          message: 'Something went wrong! Unable to upload Image',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    [createUser, setOpened, refetch]
  )
  return (
    <Modal
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Admin"
    >
      <CreateAdminForm
        register={register}
        handleSubmit={handleSubmit}
        setOpened={setOpened}
        setPassword={setPassword}
        errors={errors}
        isLoading={isLoading}
        submitHandler={submitHandler}
        generatePassword={generatePassword}
      />
    </Modal>
  )
}

export default CreateAdminModal
