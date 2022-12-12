import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { Button, Textarea, TextInput } from '@mantine/core'
import ReCAPTCHA from 'react-google-recaptcha'

import { IEmailFormData } from '@lib/types'
import { useSendEnquiryMutation } from 'features/messages/messagesApiSlice'
import { enquiryEmailTemplate } from '@lib/emailTemplates'
import FormInput from './FormComponents/FormInput'

const EnquiryForm = () => {
  const router = useRouter()
  const [sendEnquiry, { isLoading }] = useSendEnquiryMutation()
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
      showNotification({
        message: 'Enquiry Sent',
        autoClose: 5000,
        color: 'green',
      })
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
      className="flex flex-col space-y-2 rounded-lg bg-primary-light-100 px-8 py-8 shadow-2xl "
    >
      <h1 className="mb-4 text-2xl font-bold text-primary-dark-100">
        Leave a message
      </h1>
      <p className="text-justify font-normal text-tertiary">
        Fill the form and we will respond as soon as we can. Alternatively, you
        can reach out to us at{' '}
        <a
          href="mailto:admin@steppingstonesapp.com"
          className="text-primary-dark-100"
        >
          our email address
        </a>
      </p>
      <FormInput
        label="From"
        aria-label="from"
        placeholder="Please enter an email address"
        type="email"
        {...register('from', {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
        errors={errors?.from}
      />

      <FormInput
        aria-label="company"
        label="Company"
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
        errors={errors?.company}
      />

      <FormInput
        aria-label="subject"
        placeholder="Subject"
        type="text"
        label="Subject"
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
        errors={errors?.subject}
      />

      <Textarea
        placeholder="Message"
        label={
          <p className="mt-2 font-bold text-gray-900 ">
            Message <span className="text-red-500">*</span>
          </p>
        }
        autosize
        radius="md"
        minRows={3}
        {...register('message', {
          required: true,
          minLength: {
            value: 5,
            message: 'Please enter a message ',
          },
          pattern: {
            value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
            message: 'Please enter a valid message',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none bg-primary-light-100"
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
          className="w-full rounded-md border-primary-dark-100 px-4 text-center font-semibold text-primary-dark-100 shadow-md transition delay-150 duration-300 ease-in-out 
                hover:-translate-y-1 hover:scale-100 hover:bg-primary-dark-100 hover:text-primary-light-100  md:text-xl "
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
