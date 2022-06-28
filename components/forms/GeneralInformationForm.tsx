import { useCallback } from 'react'
import {
    FieldError,
   useForm, 
   SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { IFormData } from '@lib/types'
import { TextInput } from '@mantine/core'

interface IGeneralInformationForm {
  submitHandler: SubmitHandler<Partial<IFormData>>
  errors: {
    name?: FieldError | undefined
    email?: FieldError | undefined
    postCode?: FieldError | undefined
    contactNumber?: FieldError | undefined
  }
  isLoading: boolean
  register: UseFormRegister<Partial<IFormData>>
  handleSubmit: UseFormHandleSubmit<Partial<IFormData>>
}

const GeneralInformationForm = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<Partial<IFormData>>()

    const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(async (data) => {
        console.log(data)
    }, [])
    return (
      <form
        aria-label="general-information-form"
        data-testid="general-information-form"
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-1 gap-4  bg-transparent md:grid-cols-2"
      >
        <TextInput
          id="name"
          aria-label="name"
          placeholder="Your Full Name"
          label={<p className="font-light text-gray-500 ">Name</p>}
          type="text"
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
        <TextInput
          id="email"
          aria-label="Email"
          placeholder="Email"
          type="email"
          label={<p className="font-light text-gray-500 ">Email</p>}
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
        <TextInput
          id="contactNumber"
          aria-label="contact-number"
          placeholder="Your Contact Number"
          type="tel"
          label={<p className="font-light text-gray-500 ">Contact Number</p>}
          {...register('contactNumber', {
            required: true,
            pattern: {
              value: /^[0-9]{11}$/,
              message: 'Please enter a valid contact number',
            },
            minLength: {
              value: 11,
              message: 'Please enter a valid phone number',
            },
            maxLength: 11,
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.contactNumber && (
          <span className="text-center text-sm text-red-500">
            {errors.contactNumber.message || 'Your contact number is required'}
          </span>
        )}
        <TextInput
          id="postCode"
          aria-label="post-code"
          placeholder="Your Post Code"
          type="text"
          label={
            <p className="font-light text-gray-500 ">
              Zip/Postal Code
            </p>
          }
          {...register('postCode', {
            required: true,
            pattern: {
              value: /^[A-Za-z]{1,2}[0-9]{1,2} ?[0-9][A-Za-z]{2}$/i,
              message: 'Please enter a valid post code',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.postCode && (
          <span className="text-center text-sm text-red-500">
            {errors.postCode?.message || 'Your post code is required'}
          </span>
        )}
      </form>
    )
}

export default GeneralInformationForm;
