'use client';
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { CurrentUser } from '@lib/types'
import { Button, PasswordInput, TextInput } from '@mantine/core'

interface ICreateAdminProps {
  submitHandler: SubmitHandler<Partial<CurrentUser>>
  errors: {
    name?: FieldError | undefined
    email?: FieldError | undefined
    password?: FieldError | undefined
  }
  isLoading: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  register: UseFormRegister<Partial<CurrentUser>>
  handleSubmit: UseFormHandleSubmit<Partial<CurrentUser>>
  generatePassword: () => void
}

const CreateAdminForm = ({
  register,
  handleSubmit,
  submitHandler,
  errors,
  isLoading,
  setOpened,
  setPassword,
  generatePassword,
}: ICreateAdminProps) => {
  return (
    <form
      className="flex h-full w-full flex-col space-y-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div>
        <TextInput
          id="name"
          aria-label="name"
          placeholder="Your Full Name"
          type="text"
          label={
            <p className="mt-2 font-light text-gray-900 ">
              Name <span className="text-red-500">*</span>
            </p>
          }
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
      </div>
      <div>
        <TextInput
          id="email"
          aria-label="Email"
          placeholder="Email"
          type="email"
          label={
            <p className="mt-2 font-light text-gray-900 ">
              Email <span className="text-red-500">*</span>
            </p>
          }
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
      </div>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
          <PasswordInput
            id="password"
            aria-label="password"
            placeholder="Enter password"
            label={
              <p className="mt-2 font-light text-gray-900 ">
                Password <span className="text-red-500">*</span>
              </p>
            }
            {...register('passwordInput', {
              required: true,
              minLength: {
                value: 10,
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
            className="w-ful col-span-1 md:col-span-2"
          />
          <Button
            type="button"
            className=" bg-green-500 capitalize hover:bg-green-600 md:justify-self-end md:mt-8"
            onClick={generatePassword}
          >
            Generate Password
          </Button>
        </div>
        {errors.password && (
          <span className="text-center text-sm text-red-500">
            {errors.password?.message || 'A password is required'}
          </span>
        )}
      </div>
      <div className="w-full space-y-2">
        <Button
          type="submit"
          fullWidth
          className="w-full bg-blue-500"
          loading={isLoading}
        >
          Submit
        </Button>
        <Button
          type="button"
          fullWidth
          className="w-full bg-red-500 capitalize hover:bg-red-600"
          onClick={() => {
            setOpened(false)
            setPassword('')
          }}
        >
          cancel
        </Button>
      </div>
    </form>
  )
}

export default CreateAdminForm
