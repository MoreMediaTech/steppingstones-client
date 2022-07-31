import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CurrentUser, IFormData } from '@lib/types'
import { Button, Checkbox,  TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useUpdateUserMutation } from 'features/user/usersApiSlice'

const UpdateUserForm = ({
  refetch,
  user,
  handleModalClose,
  disabled
}: {
  refetch: () => void
  user?: CurrentUser
  handleModalClose?: () => void
  disabled?: boolean
}) => {

  const defaultValues = {
    name: user?.name ? (user?.name as string) : '',
    email: user?.email ? (user?.email as string) : '',
    contactNumber: user?.contactNumber ? (user?.contactNumber as string) : '',
    postCode: user?.postCode ? (user?.postCode as string) : '',
    district: user?.district ? (user?.district as string) : '',
    county: user?.county ? (user?.county as string) : '',
    organisation: user?.organisation?.name
      ? (user?.organisation?.name as string)
      : '',
    emailVerified: user?.emailVerified ? (user?.emailVerified as boolean) : false,
    isAdmin: user?.isAdmin ? (user?.isAdmin as boolean) : false,
    acceptTermsAndConditions: user?.acceptTermsAndConditions ? (user?.acceptTermsAndConditions as boolean) : false,

  }
  const [roles] = useState<string[]>([
    'USER',
    'SS_EDITOR',
    'COUNTY_EDITOR',
    'PARTNER',
  ])
  const [role, setRole] = useState<string>(user?.role as string)

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
    setRole(user?.role as string)
  }, [user])

  const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(
    async (data) => {
      const newData = {
        id: user?.id as string,
        role,
        ...data,
      }
      try {
        await updateUser(newData as CurrentUser).unwrap()
        refetch()
        handleModalClose!()
      } catch (error) {
        showNotification({
          message: 'Something went wrong! Please try again',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    [role]
  )

  return (
    <form
      aria-label="update-user-form"
      data-testid="update-user-form"
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
          label={<p className="font-normal text-gray-700 ">Organisation</p>}
          {...register('organisation', {
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
        <label htmlFor="role" className="block mb-1">
          <p className="font-normal text-gray-700 ">Role</p>
        </label>
        <select
          id="role"
          aria-label="role"
          value={role}
          disabled={disabled}
          placeholder="Your Role"
          onChange={(e) => setRole(e.target.value)}
          className="focus:shadow-outline mb-6 block w-full appearance-none rounded-md  border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          {roles?.map((itemValue, index) => {
            return (
              <option
                key={`${index} + ${itemValue}`}
                value={itemValue}
              >
                {itemValue}
              </option>
            )
          })}
        </select>
        {errors.role && (
          <span className="text-center text-sm text-red-500">
            {errors.role?.message || 'Your role is required'}
          </span>
        )}
      </div>
      <div>
        <Checkbox label="Admin" {...register('isAdmin')} />
      </div>
      <div>
        <Checkbox disabled label="Email Verified" {...register('emailVerified')} />
      </div>
      <div>
        <Checkbox disabled label="Accepted Terms and Conditions" {...register('acceptTermsAndConditions')} />
      </div>
      <div></div>
      <div>
        <Button
          type="submit"
          loading={isLoading}
          className="rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-lg"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default UpdateUserForm
