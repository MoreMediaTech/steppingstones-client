import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { Button, PasswordInput, Textarea, TextInput } from '@mantine/core'

import { NEXT_URL } from '@config/index'
import { IEmailFormData, IFormData } from '@lib/types'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useSendEnquiryMutation } from 'features/email/emailApiSlice'
import { enquiryEmailTemplate } from '@lib/emailTemplates'

const EnquiryForm = () => {
  const router = useRouter()
  const [sendEnquiry, { isLoading, isError, isSuccess, error }] =
    useSendEnquiryMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEmailFormData>()

  useEffect(() => {}, [])

  const handleSendEmail: SubmitHandler<IEmailFormData> = async (data) => {
    const message = {
      from: data.from,
      to: 'admin@steppingstonesapp.com',
      subject: data.subject,
      company: data.company,
      html: enquiryEmailTemplate(data.subject, data.message),
    }
    try {
      console.log(message)
      await sendEnquiry(message).unwrap()
      reset()
    } catch (error) {
      console.log(
        '🚀 ~ file: EnquiryForm.tsx ~ line 42 ~ consthandleSendEmail:SubmitHandler<IEmailFormData>= ~ error',
        error
      )
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSendEmail)}
      className="flex flex-col rounded-lg bg-white px-8 py-8 shadow-xl "
    >
      <h1 className="text-2xl font-bold text-gray-900">Send a message</h1>
      <TextInput
        id="from"
        aria-label="from"
        label={
          <p className="mt-8 font-light text-gray-500 ">
            From <span className="text-red-500">*</span>
          </p>
        }
        placeholder="Please enter an email address"
        type="email"
        {...register('from', {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.from && (
        <span className="text-center text-sm text-red-500">
          {errors.from?.message || 'Your email is required'}
        </span>
      )}
      <TextInput
        id="company"
        aria-label="company"
        label={
          <p className="mt-2 font-light text-gray-500 ">
            Company <span className="text-red-500">*</span>
          </p>
        }
        placeholder="Your Company"
        type="text"
        {...register('company', {
          required: true,
          minLength: {
            value: 2,
            message: 'Please enter a company with at least 2 characters',
          },
          pattern: {
            value: /^[A-Za-z -]+$/,
            message: 'Please enter a valid company',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.company && (
        <span className="text-center text-sm text-red-500">
          {errors.company?.message || 'A company is required'}
        </span>
      )}
      <TextInput
        id="subject"
        aria-label="subject"
        placeholder="Subject"
        type="text"
        label={
          <p className="mt-2 font-light text-gray-500 ">
            Subject <span className="text-red-500">*</span>
          </p>
        }
        {...register('subject', {
          required: true,
          minLength: {
            value: 5,
            message: 'Please enter a subject with at least 5 characters',
          },
          pattern: {
            value: /^[A-Za-z -]+$/,
            message: 'Please enter a valid subject',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.subject && (
        <span className="text-center text-sm text-red-500">
          {errors.subject?.message || 'A subject is required'}
        </span>
      )}
      <Textarea
        placeholder="Message"
        label={
          <p className="mt-2 font-light text-gray-500 ">
            Message <span className="text-red-500">*</span>
          </p>
        }
        autosize
        minRows={3}
        {...register('message', {
          required: true,
          minLength: {
            value: 5,
            message: 'Please enter a message ',
          },
          pattern: {
            value: /^[A-Za-z -]+$/,
            message: 'Please enter a valid message',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.message && (
        <span className="text-center text-sm text-red-500">
          {errors.message?.message || 'A subject is required'}
        </span>
      )}
      <div className="my-4 w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  )
}

export default EnquiryForm
