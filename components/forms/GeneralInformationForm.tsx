import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CurrentUser, IFormData } from '@lib/types'
import { Button, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useUpdateUserMutation } from 'features/user/usersApiSlice'

const GeneralInformationForm = ({
  refetch,
  user,
}: {
  refetch: () => void
  user: CurrentUser
}) => {
  const defaultValues = {
    name: user?.name as string,
    email: user?.email as string,
    contactNumber: user?.contactNumber as string,
    postCode: user?.postCode as string,
    district: user?.district as string,
    county: user?.county as string,
    organisation: user?.organisation as string,
    role: user?.role as string,
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: { ...defaultValues },
  })
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    // reset the form when the user changes
    reset({ ...defaultValues })
  }, [user])

  const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(
    async (data) => {
      console.log(data)
      try {
        await updateUser(data as CurrentUser).unwrap()
        refetch()
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
      aria-label="general-information-form"
      data-testid="general-information-form"
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 gap-x-4 gap-y-6  bg-transparent md:grid-cols-2"
    >
      <div>
        <TextInput
          id="name"
          aria-label="name"
          placeholder="Your Full Name"
          label={<p className="font-normal text-gray-700 ">Name</p>}
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
      </div>
      <div>
        <TextInput
          id="email"
          aria-label="Email"
          placeholder="Email"
          type="email"
          label={<p className="font-normal text-gray-700 ">Email</p>}
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
      <div>
        <TextInput
          id="contactNumber"
          aria-label="contact-number"
          placeholder="Your Contact Number"
          type="tel"
          label={<p className="font-normal text-gray-700 ">Contact Number</p>}
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
      </div>
      <div>
        <TextInput
          id="postCode"
          aria-label="post-code"
          placeholder="Your Post Code"
          type="text"
          label={<p className="font-normal text-gray-700 ">Zip/Postal Code</p>}
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
      </div>
      <div>
        <TextInput
          id="district"
          aria-label="district"
          placeholder="Your District"
          type="text"
          label={<p className="font-normal text-gray-700 ">District</p>}
          {...register('district', {
            required: true,
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: 'Please enter a valid district',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.district && (
          <span className="text-center text-sm text-red-500">
            {errors.district?.message || 'Your district is required'}
          </span>
        )}
      </div>
      <div>
        <TextInput
          id="county"
          aria-label="county"
          placeholder="Your County"
          type="text"
          label={<p className="font-normal text-gray-700 ">County</p>}
          {...register('county', {
            required: true,
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: 'Please enter a valid County',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.county && (
          <span className="text-center text-sm text-red-500">
            {errors.county?.message || 'Your county is required'}
          </span>
        )}
      </div>
      <div>
        <TextInput
          id="organisation"
          aria-label="organisation"
          placeholder="Your Organisation"
          type="text"
          label={<p className="font-normal text-gray-700 ">organisation</p>}
          {...register('organisation', {
            required: true,
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: 'Please enter a valid Organisation',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.organisation && (
          <span className="text-center text-sm text-red-500">
            {errors.organisation?.message || 'Your Organisation is required'}
          </span>
        )}
      </div>
      <div>
        <TextInput
          id="role"
          aria-label="role"
          placeholder="Your Role"
          type="text"
          label={<p className="font-normal text-gray-700 ">Role</p>}
          {...register('role', {
            required: true,
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: 'Please enter a valid Organisation',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
        />
        {errors.role && (
          <span className="text-center text-sm text-red-500">
            {errors.role?.message || 'Your role is required'}
          </span>
        )}
      </div>
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

export default GeneralInformationForm
