import React from 'react'
import {
  appendErrors,
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form'
import { CSSObject, TextInput } from '@mantine/core'
import { IFormData } from '@lib/types'

export type Ref = HTMLInputElement

type FormInputProps<T extends unknown> = {
  title?: string
  type: string
  label?: string
  placeholder?: string
  labelStyles?: CSSObject
  inputStyles?: CSSObject
  hidden?: boolean
  prependComponent?: React.ReactNode
  appendComponent?: React.ReactNode
  errors?:
    | Merge<FieldError, FieldErrorsImpl<DeepRequired<IFormData>>>
    | undefined
  props?: JSX.IntrinsicAttributes & React.RefAttributes<HTMLInputElement>
}

const FormInput = React.forwardRef(function FormInputInner<T extends unknown>(
  {
    label,
    title,
    type,
    errors,
    hidden,
    labelStyles,
    inputStyles,
    prependComponent,
    appendComponent,
    ...props
  }: FormInputProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="w-full space-y-2">
      <TextInput
        className={`w-full`}
        id={`${title}`}
        ref={ref}
        name={`${title}`}
        type={type}
        aria-label={`${label?.toLowerCase()}-input`}
        aria-invalid="true"
        variant="default"
        label={hidden ? label : undefined}
        withAsterisk
        radius="sm"
        error={
          errors ? errors.message || `A valid ${title} is required` : undefined
        }
        icon={prependComponent}
        rightSection={appendComponent}
        styles={{ label: labelStyles }}
        {...props}
      />
    </div>
  )
})

FormInput.displayName = 'FormInput'

export default FormInput
