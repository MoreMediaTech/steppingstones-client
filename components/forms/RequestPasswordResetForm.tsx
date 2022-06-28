import { IFormData } from '@lib/types'
import { Button, TextInput } from '@mantine/core'
import { FieldError, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

interface IRequestPasswordResetForm {
  submitHandler: SubmitHandler<Partial<IFormData>>
  errors: {
    email?: FieldError | undefined
  }
  isLoading: boolean
  register: UseFormRegister<Partial<IFormData>>
  handleSubmit: UseFormHandleSubmit<Partial<IFormData>>
}

const RequestPasswordResetForm = ({
  submitHandler,
  errors,
  handleSubmit,
  isLoading,
  register
}: IRequestPasswordResetForm) => {
  return (
    <form
      aria-label="request-password-reset-form"
      data-testid="request-password-reset-form"
      onSubmit={handleSubmit(submitHandler)}
      className="mx-2 mb-4 bg-transparent px-2 pt-6 pb-8 "
    >
      <div className="mb-4">
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
      </div>
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}

export default RequestPasswordResetForm
