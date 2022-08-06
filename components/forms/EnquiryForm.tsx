import {  useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { Button, Textarea, TextInput } from '@mantine/core'
import ReCAPTCHA from 'react-google-recaptcha'

import { IEmailFormData } from '@lib/types'
import { useSendEnquiryMutation } from 'features/email/emailApiSlice'
import { enquiryEmailTemplate } from '@lib/emailTemplates'

const EnquiryForm = () => {
  const router = useRouter()
  const [sendEnquiry, { isLoading }] =
    useSendEnquiryMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEmailFormData>()
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const handleSendEmail: SubmitHandler<IEmailFormData> = async (data) => {
    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef?.current?.reset()
    const message = {
      from: data.from,
      to: 'enquiries@steppingstonesapp.com',
      subject: data.subject,
      company: data.company,
      html: enquiryEmailTemplate(data.subject, data.message),
      token,
      message: data.message,
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
      className="flex flex-col space-y-2 rounded-lg bg-white px-8 py-8 shadow-2xl "
    >
      <h1 className="mb-4 text-2xl font-bold text-[#5E17EB]">
        Leave a message
      </h1>
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
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      />
      <div className="my-4 w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          size="md"
          variant="outline"
          className="w-full rounded-md px-4 text-center font-semibold hover:text-white shadow-md transition delay-150 duration-300 
                ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99]  md:text-xl "
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
      <p className="text-justify text-sm font-normal text-gray-300">
        This site is protected by reCAPTCHA and the Google{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_"
          className="underline"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          target="_"
          className="underline"
        >
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </form>
  )
}

export default EnquiryForm
