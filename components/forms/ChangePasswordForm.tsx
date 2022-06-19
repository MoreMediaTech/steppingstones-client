import { Button, PasswordInput } from '@mantine/core'
import { Inputs } from 'pages/auth/forgot-password/[token]'
import { FieldError, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

interface IChangePasswordResetForm {
  submitHandler: SubmitHandler<Inputs>
  errors: {
    password?: FieldError | undefined
    confirmPassword?: FieldError | undefined
  }
  isLoading: boolean
  register: UseFormRegister<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
}

const ChangePasswordForm = ({submitHandler, register, handleSubmit, errors, isLoading}: IChangePasswordResetForm) => {
  return (
    <form
      aria-label="change-password-form"
      data-testid="change-password-form"
      onSubmit={handleSubmit(submitHandler)}
      className="mx-2 mb-4 w-full bg-transparent px-2 pt-6 pb-8"
    >
      <div className="mb-4">
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
      </div>
      <div className="mb-4">
        <PasswordInput
          id="confirmPassword"
          aria-label="password"
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
              'Please confirm your chosen password'}
          </span>
        )}
      </div>
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </div>
    </form>
  )
}

export default ChangePasswordForm