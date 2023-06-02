'use client'
import axios from 'axios'
import { API_URL } from '@config/index'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { showNotification } from '@mantine/notifications'

import { useResetPasswordMutation } from 'app/global-state/features/auth/authApiSlice'
import { ChangePasswordForm } from 'app/components/forms'
import { IFormData } from '@lib/types'
import Loader from 'app/components/Loader'

export type Inputs = {
  password: string
  confirmPassword: string
}

async function checkTokenValidity(token: string) {
  const { data } = await axios.post(`${API_URL}/api/v1/auth/validate-token`, {
    token: token,
    type: 'RESET_PASSWORD',
  })

  if (!data.isValid) return { valid: false }

  return {
    valid: true,
  }
}

export default async function ResetPassword({
  params,
}: {
  params: { token: string }
}) {
  const { valid } = await checkTokenValidity(params.token)
  const router = useRouter()
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>()

  const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(
    async ({ password, confirmPassword }) => {
      if (password !== confirmPassword) {
        showNotification({
          message: 'Passwords do not match',
          autoClose: 3000,
          color: 'red',
        })
      }
      await resetPassword({ token: params.token, password }).unwrap()
      reset()
      router.push('/auth/login')
    },
    []
  )
  if (!valid) {
    return (
      <section className="h-screen text-gray-900 dark:text-gray-200">
        <div className="flex items-center justify-center ">
          <h1 className="my-5 text-6xl ">Invalid Link</h1>
          <p className="mb-5 text-2xl text-gray-500">
            It looks like you may have clicked on an invalid link. Please close
            this window and try again.
          </p>

          <div className="flex flex-row justify-center py-3 text-lg">
            <p className="mr-2">Return to</p>{' '}
            <Link href={'/auth/login'} className="text-blue-500">
              <a>Login</a>
            </Link>
          </div>
        </div>
      </section>
    )
  } else {
    return (
      <section className="flex h-screen items-center justify-center text-gray-900 dark:text-gray-200">
        <section className="z-50  py-8 md:w-4/12">
          <div className="w-full px-4">
            {isLoading ? (
              <Loader />
            ) : (
              <ChangePasswordForm
                submitHandler={submitHandler}
                errors={errors}
                handleSubmit={handleSubmit}
                register={register}
                isLoading={isLoading}
              />
            )}
            <div className="flex flex-row justify-center py-3 text-lg">
              <p className="mr-2">Return to</p>{' '}
              <Link href={'/account/login'} className="text-blue-500">
                Login
              </Link>
            </div>
          </div>
        </section>
      </section>
    )
  }
}
