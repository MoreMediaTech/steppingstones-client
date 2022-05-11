import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { IFormData } from '@lib/types';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { showNotification } from '@mantine/notifications';
import {
  loginUser,
  reset as resetAuthState,
  authSelector,
} from 'features/auth/authSlice'
import { NEXT_URL } from '@config/index';
import { Button, PasswordInput, TextInput } from '@mantine/core';

const LoginForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { currentUser, isLoading, isError, isAuth, error } =
      useAppSelector(authSelector)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

    useEffect(() => {
      if (isError) {
        showNotification({
          message: error?.message,
          autoClose: 3000,
          color: 'red'
        })
      }

      if (isAuth || currentUser) {
        router.replace(`${NEXT_URL}/admin`)
      }

      dispatch(resetAuthState())
    }, [currentUser, isAuth, isError, error])

  const handleLogin: SubmitHandler<IFormData> = async (data) => {
    dispatch(loginUser(data))
    reset()
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
      <div className="w-full">
         <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
