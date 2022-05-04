import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { IFormData } from '@lib/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/hooks';
import { showNotification } from '@mantine/notifications';
import {
  loginUser,
  reset as resetAuthState,
  authSelector,
} from 'features/auth/authSlice'
import Spinner from '@components/spinner'

const LoginForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { currentUser, isLoading, isError, isAuth, error } =
      useSelector(authSelector)
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
          color: 'red',
          sx: { backgroundColor: 'red' },
        })
      }

      if (isAuth || currentUser) {
        router.replace('http://localhost:3000/admin')
      }

      dispatch(resetAuthState())
    }, [currentUser, isAuth, isError, error])

  const handleSignUp: SubmitHandler<IFormData> = async (data) => {
      console.log(data)
    dispatch(loginUser(data))
    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex w-full max-w-screen-sm flex-col items-center space-y-2 px-2"
    >
      <div className="w-full rounded-md border-2 border-gray-200 bg-white">
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md p-2 focus:outline-none"
        />
      </div>
      <div className="w-full rounded-md border-2 border-gray-200 bg-white">
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register('password', { required: true })}
          className="focus:shadow-outline w-full appearance-none rounded-md p-2 focus:outline-none"
        />
      </div>
      <div className="w-full">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white w-full"
        >
          {isLoading ? <Spinner classes="h-8 w-8" /> : 'Login'}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
