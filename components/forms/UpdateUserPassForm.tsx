import { useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { CurrentUser, IFormData } from '@lib/types'
import { showNotification } from '@mantine/notifications'
import { useResetCredentialsMutation } from 'features/user/usersApiSlice'

const UpdateUserPassForm = ({
  refetch,
  user,
}: {
  refetch: () => void
  user: CurrentUser
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>()
  const [resetCredentials, { isLoading }] = useResetCredentialsMutation()

  const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(
    async (data) => {
      console.log(data)
      if (data.newPassword !== data.confirmPassword) {
        showNotification({
          message: 'Passwords do not match. Please try again.',
          autoClose: 3000,
          color: 'red',
        })
      }
      const newData = {
        id: user.id,
        password: data.password,
        newPassword: data.newPassword,
      }
      try {
        await resetCredentials(newData).unwrap()
        refetch()
        reset()
      } catch (error) {
        showNotification({
          message: error.message,
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    []
  )
  return (
    <form
      aria-label="profile-password-change-form"
      data-testid="profile-password-change-form"
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 gap-x-4 gap-y-6  bg-transparent md:grid-cols-2"
    >
      <div className="mb-4">
        <PasswordInput
          id="current-password"
          aria-label="current-password"
          placeholder="Current Password"
          {...register('password', {
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
          variant="unstyled"
          className="w-full rounded-md border-2 border-gray-200 bg-white !focus:outline-none !focus:ring-transparent"
        />
        {errors.password && (
          <span className="text-center text-sm text-red-500">
            {errors.password?.message || 'A password is required'}
          </span>
        )}
      </div>
      <div className="mb-4">
        <PasswordInput
          id="newPassword"
          aria-label="new-password"
          placeholder="New Password"
          {...register('newPassword', {
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
        {errors.newPassword && (
          <span className="text-center text-sm text-red-500">
            {errors.newPassword?.message || 'Please enter your new password'}
          </span>
        )}
      </div>
      <div>
        <PasswordInput
          id="confirmPassword"
          aria-label="confirm-password"
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
              'Please confirm your new password'}
          </span>
        )}
      </div>
      <div></div>
      <div>
        <h2 className="font-semibold">Password requirements:</h2>
        <p className="text-sm text-gray-400">
          Ensure that these requirements are met:
        </p>
        <ul className="ml-4 text-sm text-gray-400">
          <li>At least 10 characters and up to 100 characters</li>
          <li>At least one uppercase character</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least on special character, e.g. ! @ # ?</li>
        </ul>
      </div>
      <div></div>
      <div>
        <Button
          type="submit"
          className="rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-lg"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default UpdateUserPassForm
