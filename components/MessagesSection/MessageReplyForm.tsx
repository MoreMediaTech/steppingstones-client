import React, { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'

import FormInput from '@components/forms/FormComponents/FormInput'
import { MessageProps } from '@lib/types'
import { useAppSelector, useAppDispatch} from 'app/hooks'
import { messagesSelector, setReply } from 'features/messages/messagesSlice'

type FormInputs = {
    from: string
    subject: string
    message: string
}

const MessageReplyForm = () => {
    const dispatch = useAppDispatch()
    const {enquiry, reply} = useAppSelector(messagesSelector)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>(
        { defaultValues: { from: enquiry?.from, subject: enquiry?.subject, message: '' } }
    );

    useEffect(() => {
        reset({ from: enquiry?.from, subject: enquiry?.subject, message: '' })
    }, [reply])

    const handleClose = useCallback(() => {
        dispatch(setReply({enquiry: null, reply: false}))
    }, [])

    const onSubmit: SubmitHandler<FormInputs> = useCallback((data) => {
        console.log(data)
        dispatch(setReply({enquiry: null, reply: false}))
    }, [])
  return (
    <div className="w-full border-t border-primary-dark-100 p-2">
      <div className="flex w-full items-center justify-end p-1">
        <button type="button" onClick={handleClose}>
          <FaTimes fontSize={30} className="text-primary-dark-100" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput hidden type="email" {...register('from')} />
        <FormInput hidden type="text" {...register('subject')} />
        <textarea
          id="message"
          className="form-textarea w-full rounded-lg border border-gray-300 bg-gray-100  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          rows={5}
          {...register('message')}
        />
        <button
          type="button"
          className="rounded bg-tertiary-500 px-4 py-2 text-white shadow"
        >
          <p>Send</p>
        </button>
      </form>
    </div>
  )
}

export default MessageReplyForm