import React from 'react'
import { appendErrors, DeepRequired, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { IFormData } from '@lib/types'


export type Ref = HTMLInputElement

type FormInputProps = {
  title?: string
  type: string
  label: string
  placeholder?: string
  errors: Merge<FieldError, FieldErrorsImpl<DeepRequired<IFormData>>> | undefined
}

const FormInput: React.FunctionComponent<
  FormInputProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef<Ref, FormInputProps>(
  ({ label, title, type, errors, ...props }: FormInputProps, ref) => (
    <div className="w-full space-y-2">
      <label
        htmlFor={type}
        className="my-2 text-sm font-semibold text-gray-900"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        id={`${title}`}
        ref={ref}
        name={`${title}`}
        type={type}
        aria-invalid="true"
        {...props}
      />
      {errors && (
        <span className="text-center text-sm text-red-500">
          {errors.message || `A valid ${title} is required`}
        </span>
      )}
    </div>
  )
)

FormInput.displayName = 'FormInput'

export default FormInput
