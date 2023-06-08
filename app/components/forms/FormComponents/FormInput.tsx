import React from 'react'
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form'
import { CSSObject, TextInput } from '@components/mantine-components'
import { IFormData } from '@lib/types'

export type Ref = HTMLInputElement
export type InputProps = React.ComponentPropsWithoutRef<'input'> 

type FormInputProps<T extends unknown> = {
  title?: string
  type: string
  label?: string
  placeholder?: string
  labelStyles?: CSSObject
  inputStyles?: CSSObject
  hidden?: boolean
  resolvedTheme?: string
  prependComponent?: React.ReactNode
  appendComponent?: React.ReactNode
  errors?:
    | Merge<FieldError, FieldErrorsImpl<DeepRequired<IFormData>>>
    | undefined
  props?: InputProps
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
    resolvedTheme,
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
        label={!hidden ? label : undefined}
        labelProps={{
          style: {
            display: hidden ? 'none' : 'block',
            fontSize: '0.875rem',
            color: resolvedTheme === 'dark' ? 'white' : 'black',
          },
        }}
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
