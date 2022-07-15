import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { Button, Textarea, TextInput } from '@mantine/core'

import { IEmailFormData } from '@lib/types'
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
      to: 'enquires@steppingstonesapp.com',
      subject: data.subject,
      company: data.company,
      html: enquiryEmailTemplate(data.subject, data.message),
    }
    try {
      await sendEnquiry(message).unwrap()
      reset()
    } catch (error) {
     showNotification({
        message: 'Unable to send enquiry',
        autoClose: 3000,
        color: 'red',
     })
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSendEmail)}
      className="flex flex-col rounded-lg bg-white px-8 py-8 shadow-2xl space-y-2 "
    >
      <h1 className="text-2xl font-bold text-[#5E17EB] mb-4">Leave a message</h1>
      <p className="text-justify font-normal text-[#00DCB3]">
        Fill the form and we will respond as soon as we can. Alternatively, you
        can reach out to us at{' '}
        <a href="mailto:admin@steppingstonesapp.com" className="text-[#5E17EB]">
          our email address
        </a>
      </p>
      <TextInput
        id="from"
        aria-label="from"
        label={
          <p className="mt-4 font-light text-gray-500 ">
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
          className="w-full rounded-md bg-[#5E17EB] px-4 text-center font-semibold text-white shadow-xl transition delay-150 duration-300 
                ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99]  md:text-xl lg:text-2xl"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  )
}

export default EnquiryForm
