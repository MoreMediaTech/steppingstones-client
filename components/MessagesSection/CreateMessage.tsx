import React from 'react'
import { Modal, Title } from '@mantine/core'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'

// components
import FormInput from '@components/forms/FormComponents/FormInput'
import { FormInputs } from './MessageReplyForm'

// redux
import { useGetUsersQuery } from '../../features/user/usersApiSlice';

type Props = {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

interface IAutoComplete {
  isVisible?: boolean;
  suggestions: string[];
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>
  handleSuggestionClick: (suggestion: string) => void
}

function AutoComplete({
  suggestions,
  handleSuggestionClick,
}: IAutoComplete): JSX.Element {
  const [isVisible, setIsVisible] = React.useState<boolean>(suggestions.length > 0)
  return (
    <div
      className={`${
        isVisible
          ? 'absolute z-50 container block rounded-md bg-gray-200 sm:w-full'
          : 'hidden'
      }`}
    >
      <ul>
        {suggestions.map((email, index) => (
          <li
            className="cursor-pointer border border-none p-2 hover:bg-gray-800 hover:text-gray-200 "
            key={index}
            onClick={() => {
              handleSuggestionClick(email)
              setIsVisible(false)
            }}
          >
            {email}
          </li>
        ))}
      </ul>
    </div>
  )
}

const CreateMessage = ({ opened, setOpened }: Props) => {
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
  } = useForm<FormInputs>()
  const searchedEmails = useWatch({ control: control, name: 'from'})

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
    console.log(data)
    setOpened(false)
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    reset({ from: suggestion, subject: '', message: '' })
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={2}>New Message</Title>}
        overflow="outside"
        fullScreen
        className="bg-primary-light-100 dark:bg-primary-dark-700"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput hidden prependComponent={<Title order={6}>To:</Title>} type="email" {...register('from')} />
          <AutoComplete suggestions={emails} handleSuggestionClick={handleSuggestionClick} />
          <FormInput hidden placeholder="Subject" type="text" {...register('subject')} />
          <textarea
            id="message"
            className="form-textarea w-full rounded-lg border border-gray-300 p-2 bg-gray-100  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="enter message..."
            rows={5}
            {...register('message')}
          />
          <button
            type="submit"
            className="rounded bg-tertiary-500 px-4 py-2 text-white shadow"
          >
            <p>Send</p>
          </button>
        </form>
      </Modal>
    </>
  )
}

export default CreateMessage
