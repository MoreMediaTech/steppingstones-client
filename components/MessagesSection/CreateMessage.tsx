'use client'
import React from 'react'
import { Modal, Title, Text } from '@mantine/core'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'

// components
import FormInput from '@components/forms/FormComponents/FormInput'
import { FormInputs } from './MessageReplyForm'
import AutoComplete from './AutoComplete'
import FormRowSelect from '@components/forms/FormComponents/FormRowSelect'

// redux
import { useGetUsersQuery } from '../../app/global-state/features/user/usersApiSlice'
import {
  useSendEmailMutation,
  useSendInAppMsgMutation,
} from '../../app/global-state/features/messages/messagesApiSlice'

// hooks
import { useAuthUser } from '../../hooks/useAuthUser'

type Props = {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateMessage: React.FC<Props> = ({ opened, setOpened }): JSX.Element => {
  const [sendEmail, { isLoading }] = useSendEmailMutation()
  const [sendInAppMsg, { isLoading: isSendingInAppMsg }] =
    useSendInAppMsgMutation()
  const user = useAuthUser()

  const { data: users } = useGetUsersQuery()
  // get user email addresses
  const userEmails = users?.map((user) => user.email) as string[]
  const [emails, setEmails] = React.useState<string[]>(userEmails)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: { from: user?.email, to: '', subject: '', message: '' },
  })
  const searchedEmails = useWatch({ control: control, name: 'to' })

  React.useEffect(() => {
    if (searchedEmails) {
      const filteredEmails = userEmails?.filter((userEmail) =>
        userEmail?.toLowerCase().includes(searchedEmails.toLowerCase())
      )
      setEmails(filteredEmails || [])
    }
  }, [searchedEmails, users])

  // onSubmit handler to send message
  const onSubmit: SubmitHandler<FormInputs> = React.useCallback((data) => {
    const message = {
      from: user?.email as string,
      to: data.to,
      subject: data.subject,
      message: data.message,
      html: '',
    }
    try {
      if (data.type === 'external') {
        sendEmail(message)
      } else {
        sendInAppMsg(message)
      }
      showNotification({
        message: 'Message sent',
        color: 'success',
        autoClose: 3000,
      })
      reset({ from: user?.email, to: '', subject: '', message: '' })
      setOpened(false)
    } catch (error) {
      console.log(error)
      showNotification({
        message: 'Error sending message',
        color: 'error',
        autoClose: 3000,
      })
    }
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    reset({ from: user?.email, to: suggestion, subject: '', message: '' })
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={2}>New Message</Title>}
        fullScreen
        className="bg-primary-light-100 dark:bg-primary-dark-700"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            hidden
            prependComponent={<Text fz="xs">From:</Text>}
            type="email"
            {...register('from')}
          />
          <FormInput
            hidden
            prependComponent={<Text fz="xs">To:</Text>}
            type="email"
            {...register('to')}
          />
          <AutoComplete
            suggestions={emails || []}
            handleSuggestionClick={handleSuggestionClick}
          />
          <FormInput
            hidden
            placeholder="Subject"
            type="text"
            {...register('subject')}
          />
          <FormRowSelect
            type="emailType"
            list={['external', 'internal']}
            {...register('type')}
          />
          <textarea
            id="message"
            className="form-textarea w-full rounded-lg border border-gray-300 bg-gray-100 p-2  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="enter message..."
            rows={5}
            {...register('message')}
          />
          <button
            type="submit"
            className="rounded bg-tertiary-500 px-4 py-2 text-white shadow"
          >
            Send
          </button>
        </form>
      </Modal>
    </>
  )
}

export default CreateMessage
