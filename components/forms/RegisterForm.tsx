'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IFormData } from '@lib/types'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import {
  Button,
  Checkbox,
  NativeSelect,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import Link from 'next/link'

import { useRegisterPartnerMutation } from 'app/global-state/features/auth/authApiSlice'
import { counties } from 'data'

import { NEXT_URL } from '@config/index'

const RegisterForm = () => {
  const router = useRouter()
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterPartnerMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  const handleSignUp: SubmitHandler<IFormData> = async (data) => {
    if (!data.acceptTermsAndConditions) {
      showNotification({
        message: 'You must accept the terms and conditions',
        color: 'red',
      })
    }
    if (data.password !== data.confirmPassword) {
      return showNotification({
        message: 'Passwords do not match. Please try again.',
        color: 'red',
        autoClose: 3000,
      })
    }

    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      county: data.county,
      postCode: data.postCode,
      organisation: data.organisation,
      contactNumber: data.contactNumber,
      acceptTermsAndConditions: data.acceptTermsAndConditions,
      acceptContactRequest: data.acceptContactRequest,
    }
    try {
      await registerUser(user).unwrap()
      reset()
      router.replace(`${NEXT_URL}/auth/login`)
    } catch (error) {
      if (!error?.response) {
        showNotification({
          message: 'No server response',
          autoClose: 3000,
          color: 'red',
        })
      } else if (error.response?.status === 400) {
        showNotification({
          message: 'Invalid credentials',
          autoClose: 3000,
          color: 'red',
        })
      } else if (error.response?.status === 401) {
        showNotification({
          message: 'Unauthorized',
          autoClose: 3000,
          color: 'red',
        })
      } else {
        showNotification({
          message: 'Unable to complete registration',
          autoClose: 3000,
          color: 'red',
        })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex w-full max-w-screen-sm flex-col items-center space-y-2 px-2"
    >
      <p className="text-sm font-thin">
        Please complete and submit the following details to register. We will
        not provide your details to any other third party/organisation and will
        only use your information for the purpose provided.
      </p>
      <TextInput
        id="organisation"
        aria-label="organisation-name"
        placeholder="Your Organisation Name"
        type="text"
        {...register('organisation', {
          required: true,
          minLength: {
            value: 2,
            message:
              'Please enter an organisation name with at least 2 characters',
          },
          pattern: {
            value: /^[A-Za-z -]+$/,
            message: 'Please enter a valid organisation name',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.organisation && (
        <span className="text-center text-sm text-red-500">
          {errors.organisation?.message || 'Organisation name is required'}
        </span>
      )}
      <TextInput
        id="name"
        aria-label="name"
        placeholder="Your Full Name"
        type="text"
        {...register('name', {
          required: true,
          minLength: {
            value: 2,
            message: 'Please enter a name with at least 2 characters',
          },
          pattern: {
            value: /^[A-Za-z -]+$/,
            message: 'Please enter a valid name',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.name && (
        <span className="text-center text-sm text-red-500">
          {errors.name?.message || 'Your full name is required'}
        </span>
      )}
      <TextInput
        id="email"
        aria-label="Email"
        placeholder="Email"
        type="email"
        {...register('email', {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.email && (
        <span className="text-center text-sm text-red-500">
          {errors.email?.message || 'Your email is required'}
        </span>
      )}
      <PasswordInput
        id="password"
        aria-label="password"
        placeholder="Enter password"
        {...register('password', {
          required: true,
          minLength: {
            value: 7,
            message: 'Please enter a password with at least 7 characters',
          },
          maxLength: {
            value: 15,
            message: 'Please enter a password not more than 15 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/,
            message:
              'Password must contain at least one uppercase letter, one number and one special character',
          },
        })}
        variant="unstyled"
        className="w-full rounded-md border-2 border-gray-200 bg-white"
      />
      {errors.password && (
        <span className="text-center text-sm text-red-500">
          {errors.password?.message || 'A password is required'}
        </span>
      )}
      <PasswordInput
        id="confirmPassword"
        aria-label="password"
        placeholder="Confirm password"
        {...register('confirmPassword', {
          required: true,
          minLength: {
            value: 7,
            message: 'Please enter a password with at least 7 characters',
          },
          maxLength: {
            value: 15,
            message: 'Please enter a password not more than 15 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/,
            message:
              'Password must contain at least one uppercase letter, one number and one special character',
          },
        })}
        variant="unstyled"
        className="w-full rounded-md border-2 border-gray-200 bg-white"
      />
      {errors.confirmPassword && (
        <span className="text-center text-sm text-red-500">
          {errors.confirmPassword?.message ||
            'Please confirm your chosen password'}
        </span>
      )}
      <TextInput
        id="contactNumber"
        aria-label="contact-number"
        placeholder="Your Contact Number"
        type="tel"
        {...register('contactNumber', {
          required: true,
          pattern: {
            value: /^[0-9]{11}$/,
            message: 'Please enter a valid contact number',
          },
          minLength: {
            value: 11,
            message: 'Please enter a valid phone number',
          },
          maxLength: 11,
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.contactNumber && (
        <span className="text-center text-sm text-red-500">
          {errors.contactNumber.message || 'Your contact number is required'}
        </span>
      )}
      <TextInput
        id="postCode"
        aria-label="post-code"
        placeholder="Your Post Code"
        type="text"
        {...register('postCode', {
          required: true,
          pattern: {
            value: /^[A-Za-z]{1,2}[0-9]{1,2} ?[0-9][A-Za-z]{2}$/i,
            message: 'Please enter a valid post code',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.postCode && (
        <span className="text-center text-sm text-red-500">
          {errors.postCode?.message || 'Your post code is required'}
        </span>
      )}
      <NativeSelect
        id="county"
        data={counties}
        placeholder="Select County"
        className="w-full"
        {...register('county', { required: true })}
      />
      <Checkbox
        id="acceptContactRequest"
        aria-label="accept-contact-request"
        label="I am happy to be contacted by SteppingStones or other nominated support agencies to support me or my organisation."
        {...register('acceptContactRequest', { required: true })}
      />
      {errors.acceptContactRequest &&
        errors.acceptContactRequest.type === 'required' && (
          <span className="text-center text-sm text-red-500">
            This is required.
          </span>
        )}
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-indigo-900">
          Terms and Conditions
        </h1>
        <p className="text-xs font-thin">
          We want to let you know how Stepping Stones works and why we need your
          registration details (all your personal registration details are
          listed above). Please see our{' '}
          <Link href={'/terms-condition'} className="underline">
            terms and conditions
          </Link>
        </p>
        <Checkbox
          id="acceptTermsAndConditions"
          aria-label="accept-terms-condition"
          label="I accept the user agreement and disclaimer terms. I confirm I am registering on behalf of a locally-based, small to medium sized enterprise (SME)"
          {...register('acceptTermsAndConditions', {
            required: true,
          })}
        />
        {errors.acceptTermsAndConditions &&
          errors.acceptTermsAndConditions.type === 'required' && (
            <span className="text-center text-sm text-red-500">
              You must accept the terms and conditions
            </span>
          )}
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-indigo-900">Your data</h1>
        <p className="text-xs font-thin">
          Under the new General Data Protection Regulation (GDPR) you are
          required to consent to your data (all your personal registration
          details are listed above) being stored and used to provide you with
          Stepping Stones services. Stepping Stone will only use this data for
          the purposes of:
        </p>
        <ul className="ml-2 list-disc space-y-1 text-justify text-xs font-thin">
          <li>
            Sending you an email with details on how to change your password if
            you have forgotten it
          </li>
          <li>Sending you an email with news updates regarding funding</li>
          <li>
            Sending you an email time to time requesting feedback about the
            service
          </li>
        </ul>
      </div>
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
