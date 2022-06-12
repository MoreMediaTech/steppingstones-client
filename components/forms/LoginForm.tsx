import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { Button, PasswordInput, TextInput } from '@mantine/core'


import { useLoginMutation } from 'features/auth/authApiSlice'
import { NEXT_URL } from '@config/index'
import { AuthState, IFormData } from '@lib/types'
import Link from 'next/link'

const LoginForm = () => {
  const router = useRouter()

  const [login, { isLoading, isError, error: loginError }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  const handleLogin: SubmitHandler<IFormData> = async (data) => {
    try {
      const responseData = await login({
        email: data.email,
        password: data.password,
      }).unwrap()
      localStorage.setItem('token', responseData.token)
      router.replace(`${NEXT_URL}/admin`)
      reset()
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
          message: 'Login Failed',
          autoClose: 3000,
          color: 'red',
        })
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex w-full max-w-screen-sm flex-col items-center space-y-2 px-2"
    >
      <TextInput
        id="email"
        aria-label="Email"
        placeholder="Email"
        label={
          <p className="mt-8 font-light text-white ">
            Username<span className="text-red-500">*</span>
          </p>
        }
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
        label={
          <p className="mt-2 font-light text-white ">
            Password <span className="text-red-500">*</span>
          </p>
        }
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
        className="w-full "
      />
      <div className="mb-4 place-self-start">
        <Link href={'/auth/forgot-password'}>
          <a className="cursor-pointer  text-sm text-indigo-900">
            Forgot Password?
          </a>
        </Link>
      </div>
      {errors.password && (
        <span className="text-center text-sm text-red-500">
          {errors.password?.message || 'A password is required'}
        </span>
      )}
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="mt-4 w-full rounded-md border border-indigo-900 bg-indigo-900 text-white"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
