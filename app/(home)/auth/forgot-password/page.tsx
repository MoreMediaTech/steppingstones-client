'use client'
import { useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'

import { RequestPasswordResetForm } from '@components/forms'
import { useRequestPasswordResetMutation } from 'app/global-state/features/auth/authApiSlice'
import { validateEmail } from '@lib/emailVerification'
import { IFormData } from '@lib/types'

export type Inputs = {
  email: string
}

export default function ForgotPassword() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>()
  const router = useRouter()
  const [requestPasswordReset, { isLoading, isSuccess }] =
    useRequestPasswordResetMutation()

  const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(
    async (data) => {
      if (!validateEmail(data?.email as string)) {
        showNotification({
          message: 'Please enter a valid email address',
          autoClose: 3000,
          color: 'red',
        })
        return
      }

      try {
        await requestPasswordReset(data).unwrap()
        reset()
        router.push('/auth/login')
      } catch (error) {
        if (!error?.response) {
          showNotification({
            message: 'No server response',
            autoClose: 3000,
            color: 'red',
          })
        } else if (error.response?.status === 400) {
          showNotification({
            message: 'Invalid email address',
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
            message: 'Unable to complete request',
            autoClose: 3000,
            color: 'red',
          })
        }
      }
    },
    []
  )

  return (
    <section className="bg-white py-10 text-gray-900 ">
      <div className="mx-auto my-10 max-w-screen-sm">
        {isSuccess ? (
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="my-5 text-2xl sm:text-5xl ">
              Password reset request received. An email has been sent to the
              provided email account.
            </h1>
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col items-center justify-center">
              <h1 className="my-5 text-2xl sm:text-5xl ">Forgot password</h1>
              <p className="mb-5 text-center text-gray-500 sm:text-xl">
                Enter the email address associated with your account, and
                we&apos;ll send you a link to reset your password.
              </p>
            </div>
            <RequestPasswordResetForm
              submitHandler={submitHandler}
              errors={errors}
              handleSubmit={handleSubmit}
              register={register}
              isLoading={isLoading}
            />
          </>
        )}
        <div className="flex flex-row justify-center py-3 text-lg">
          <p className="mr-2">Return to</p>{' '}
          <Link href={'/account/login'} className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </section>
  )
}
