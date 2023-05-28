import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { API_URL } from '@config/index'
import Image from 'next/image'
import { MainLayout } from 'layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { showNotification } from '@mantine/notifications'

import { useResetPasswordMutation } from 'app/global-state/features/auth/authApiSlice'
import Spinner from '@components/spinner'
import { ChangePasswordForm } from '@components/forms'
import { IFormData } from '@lib/types'
import useHasMounted from '@hooks/useHasMounted'

export type Inputs = {
  password: string
  confirmPassword: string
}

const ResetPassword = ({ token, valid }: { token: string; valid: boolean }) => {
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
      await resetPassword({ token, password }).unwrap()
      reset()
      router.push('/auth/login')
    },
    []
  )
  if (!valid) {
    return (
      <MainLayout title="Reset Password">
        <main className="h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">
          <div className="flex items-center justify-center ">
            <h1 className="my-5 text-6xl ">Invalid Link</h1>
            <p className="mb-5 text-2xl text-gray-500">
              It looks like you may have clicked on an invalid link. Please
              close this window and try again.
            </p>

            <div className="flex flex-row justify-center py-3 text-lg">
              <p className="mr-2">Return to</p>{' '}
              <Link href={'/auth/login'} className="text-blue-500">
                <a>Login</a>
              </Link>
            </div>
          </div>
        </main>
      </MainLayout>
    )
  } else {
    return (
      <MainLayout title="Reset Password">
        <main className="h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">
          <div className="flex h-screen w-full flex-col md:flex-row">
            <div className="relative hidden transform md:bottom-0 md:left-0 md:top-0 md:block md:w-8/12 md:overflow-y-auto">
              <div style={{ width: '100%', height: '100%' }}>
                {/* <Image
                  src={url}
                  alt="by Lauren Fleischmann"
                  layout="fill"
                  quality={75}
                  objectFit="cover"
                /> */}
              </div>
            </div>
            <section className="right-0 z-50 flex items-center justify-center py-8 md:w-4/12">
              <div className="w-full px-4">
                {isLoading ? (
                  <Spinner classes="w-12 h-12" message="Loading..." />
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
          </div>
        </main>
      </MainLayout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token

  if (cookies) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { data } = await axios.post(`${API_URL}/api/v1/auth/validate-token`, {
    token: context.params?.token,
    type: 'RESET_PASSWORD',
  })

  if (!data.isValid) return { props: { valid: false } }

  return {
    props: { token: context.params?.token, valid: true },
  }
}

export default ResetPassword
