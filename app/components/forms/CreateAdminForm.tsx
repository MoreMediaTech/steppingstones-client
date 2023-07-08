'use client';
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { useTheme } from 'next-themes';
import { Button, TextInput } from '@mantine/core'
import { UserSchemaWithIdAndOrganisationType } from '@models/User';

interface ICreateAdminProps {
  submitHandler: SubmitHandler<Partial<UserSchemaWithIdAndOrganisationType>>
  errors: {
    name?: FieldError | undefined
    email?: FieldError | undefined
    password?: FieldError | undefined
  }
  isLoading: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  register: UseFormRegister<Partial<UserSchemaWithIdAndOrganisationType>>
  handleSubmit: UseFormHandleSubmit<Partial<UserSchemaWithIdAndOrganisationType>>
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
  const { resolvedTheme } = useTheme()
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
            <p className="mt-2 font-light text-gray-900 dark:text-gray-200 ">
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
          labelProps={{
            style: {
              display: 'block',
              fontSize: '0.875rem',
              color: resolvedTheme === 'dark' ? 'white' : 'black',
            },
          }}
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
            <p className="mt-2 font-light text-gray-900 dark:text-gray-200">
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
          labelProps={{
            style: {
              display: 'block',
              fontSize: '0.875rem',
              color: resolvedTheme === 'dark' ? 'white' : 'black',
            },
          }}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.email && (
          <span className="text-center text-sm text-red-500">
            {errors.email?.message || 'Your email is required'}
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
