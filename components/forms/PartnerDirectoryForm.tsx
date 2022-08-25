import React from 'react'
import { Button } from '@mantine/core'
import {
  DeepRequired,
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

import { PartnerData, ValueCategory, IFormData } from '@lib/types'
import { PARTNER_TYPE, VALUE_CATEGORIES } from 'data'
import FormRowSelect from './FormComponents/FormRowSelect'
import FormInput from './FormComponents/FormInput'
import FormCheckbox from './FormComponents/FormCheckBox'

interface IPartnerDirectoryFormProps {
  errors: FieldErrorsImpl<DeepRequired<IFormData>>
  isLoading: boolean
  submitHandler: SubmitHandler<IFormData>
  register: UseFormRegister<IFormData>
  handleSubmit: UseFormHandleSubmit<IFormData>
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PartnerDirectoryForm = ({
  errors,
  handleSubmit,
  isLoading,
  register,
  submitHandler,
}: IPartnerDirectoryFormProps) => {

  return (
    <form
      aria-label="update-user-form"
      data-testid="update-user-form"
      onSubmit={handleSubmit(submitHandler)}
      className="container mx-auto space-y-6  bg-white"
    >
      <div className="grid grid-cols-1 gap-x-4 gap-y-6  bg-transparent sm:grid-cols-2 md:grid-cols-3">
        <FormInput
          label="Name"
          aria-label="name-input"
          aria-errormessage="name-error"
          placeholder="Enter a full name"
          type="text"
          {...register('name', {
            required: true,
            minLength: {
              value: 2,
              message: 'Please enter a name with at least 2 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid name',
            },
          })}
          errors={errors.name}
        />

        <FormInput
          label="Email"
          aria-label="email-input"
          aria-errormessage="email-error"
          placeholder="Email"
          type="text"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message:
                'Invalid email address. Please enter a valid email address',
            },
          })}
          errors={errors.email}
        />

        <FormInput
          label="Organisation"
          aria-label="organisation-input"
          aria-errormessage="organisation-error"
          placeholder="Organisation"
          type="text"
          {...register('organisation', {
            required: true,
            minLength: {
              value: 2,
              message:
                'Please enter an organisation name with at least 2 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid organisation name',
            },
          })}
          errors={errors.organisation}
        />

        <FormInput
          label="Position"
          aria-label="position-input"
          aria-errormessage="position-error"
          placeholder="Position"
          type="text"
          {...register('position', {
            required: true,
            minLength: {
              value: 2,
              message: 'Please enter a position with at least 2 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid position',
            },
          })}
          errors={errors.position}
        />

        <FormInput
          label="Responsible For - Projects?"
          aria-label="project-input"
          aria-errormessage="project-error"
          placeholder="Projects"
          type="text"
          {...register('projectsResponsibleFor', {
            required: true,
            minLength: {
              value: 2,
              message: 'Please enter a project with at least 2 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid project',
            },
          })}
          errors={errors.projectsResponsibleFor}
        />
        <FormInput
          label="Expected Closing Date"
          aria-label="closing-date-input"
          aria-errormessage="closing-date-error"
          placeholder="Select Date"
          type="date"
          {...register('closingDate')}
          errors={errors.closingDate}
        />

      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6  bg-transparent sm:grid-cols-2 md:grid-cols-3">
        <Button type="submit" loading={isLoading} variant="outline">
          {isLoading ? 'Adding Partner.....' : 'Add Partner'}
        </Button>
      </div>
    </form>
  )
}

export default PartnerDirectoryForm
