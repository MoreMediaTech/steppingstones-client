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
      className="container mx-auto rounded-lg bg-white p-4 shadow-xl space-y-4"
    >
      <div className="grid grid-cols-1 gap-x-4 gap-y-6  bg-transparent sm:grid-cols-2 md:grid-cols-3">
        <div className="w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            aria-label="partner-name"
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
            className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-center text-sm text-red-500">
              {errors.name.message || 'A valid name is required'}
            </span>
          )}
        </div>
        <div className="w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Email <span className="text-red-500">*</span>
          </label>
          <input
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
            className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-center text-sm text-red-500">
              {errors.email?.message || 'Your email is required'}
            </span>
          )}
        </div>
        <div className="w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Organisation <span className="text-red-500">*</span>
          </label>
          <input
            id="organisation"
            aria-label="organisation"
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
            className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.organisation && (
            <span className="text-center text-sm text-red-500">
              {errors.organisation?.message || 'Organisation name is required'}
            </span>
          )}
        </div>
        <div className="w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Value Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register('valueCategory')}
            className="form-select block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          >
            {VALUE_CATEGORIES.map((category) => (
              <option key={`${category}`} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Partner Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('partnerType')}
            className="form-select block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            {PARTNER_TYPE.map((type) => (
              <option key={`${type}`} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Position <span className="text-red-500">*</span>
          </label>
          <input
            id="position"
            aria-label="position"
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
            className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-center text-sm text-red-500">
              {errors.name.message || 'A valid position is required'}
            </span>
          )}
        </div>
        <div className="w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Responsible For - Projects? <span className="text-red-500">*</span>
          </label>
          <input
            id="project-responsible-for"
            aria-label="project-responsible-for"
            placeholder="Project"
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
            className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-center text-sm text-red-500">
              {errors.name.message || 'A valid project is required'}
            </span>
          )}
        </div>
        <div className="relative w-full space-y-2">
          <label className="my-2 text-sm font-semibold text-gray-900">
            Expected Closing Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500  sm:text-sm"
            placeholder="Select date"
            {...register('closingDate') }
          />
        </div>
        <div className="flex w-full items-center space-x-4 sm:mt-8">
          <input
            type="checkbox"
            {...register('isEmail')}
            className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
          />
          <label className="my-2 text-sm font-semibold text-gray-900">
            Select For Emailing <span className="text-red-500">*</span>
          </label>
        </div>
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
