'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Modal } from '@mantine/core'

import { useCreateUserMutation } from 'app/global-state/features/user/usersApiSlice'
import CreateAdminForm from 'app/components/forms/CreateAdminForm'
import { generatePass } from '@lib/generatePass'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

const CreateAdminModal = ({
  opened,
  setOpened,
  refetch,
  user,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  user: UserSchemaWithIdAndOrganisationType
}) => {
  const [password, setPassword] = useState<string>('')
  const [createUser, { isLoading }] = useCreateUserMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<UserSchemaWithIdAndOrganisationType>>()

 

  const generatePassword = useCallback(() => {
    const password = generatePass(12)
    setPassword(password)
  }, [])

  const submitHandler: SubmitHandler<
    Partial<UserSchemaWithIdAndOrganisationType>
  > = useCallback(
    async (data) => {
      try {
        await createUser(data as UserSchemaWithIdAndOrganisationType).unwrap()
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
