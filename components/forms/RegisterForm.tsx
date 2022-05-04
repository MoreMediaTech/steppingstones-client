import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { IFormData } from '@lib/types'
import { useAppDispatch } from 'app/hooks'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import FormRowSelect from './FormComponents/FormRowSelect'
import { counties } from 'data'
import { registerUser, reset as resetAuthState, authSelector } from 'features/auth/authSlice'
import Spinner from '@components/spinner'
import { Button } from '@mantine/core'
import { NEXT_URL } from '@config/index'

const RegisterForm = () => {
    const router = useRouter()
  const [opened, setOpen] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  const dispatch = useAppDispatch()
  const { currentUser, isLoading, isError, isAuth, error } = useSelector( authSelector)

  useEffect(() => {
    if(isError){
        showNotification({
          message: error?.message,
          autoClose: 3000,
          color: 'red',
          sx: { backgroundColor: 'red' },
        })
    }

    if(isAuth || currentUser){
        router.replace(`${NEXT_URL}/admin`)
    }

    dispatch(resetAuthState())
  }, [currentUser, isAuth, isError, error])

  const handleSignUp: SubmitHandler<IFormData> = async (data) => {
    console.log(data)
    if (data.password !== data.confirmPassword) {
      return showNotification({message:'Passwords do not match. Please try again.', color: 'red', autoClose: 3000})
    }

    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      county: data.county,
    }

    dispatch(registerUser(user))
    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex w-full max-w-screen-sm flex-col items-center space-y-2 px-2"
    >
      <div className="w-full rounded-md border-2 border-gray-200 bg-white">
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          {...register('name', { required: true })}
          className="focus:shadow-outline w-full appearance-none rounded-md p-2 focus:outline-none"
        />
      </div>
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
      <div className="w-full rounded-md border-2 border-gray-200 bg-white">
        <label htmlFor="confirmPassword"></label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          {...register('confirmPassword', { required: true })}
          className="focus:shadow-outline w-full appearance-none rounded-md p-2 focus:outline-none"
        />
      </div>
      <FormRowSelect
        list={['Select County', ...counties]}
        opened={opened}
        setOpen={setOpen}
        title=""
        type="County"
        errors={errors}
        {...register('county', { required: true })}
      />
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          variant="filled"
        >
            Sign Up
          
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
