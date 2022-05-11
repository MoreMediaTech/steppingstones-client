import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import dynamic from 'next/dynamic'

import { IPartnerFormData } from '@lib/types'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import {
  Button,
  Checkbox,
  NativeSelect,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { FaCheckCircle } from 'react-icons/fa'
import { MdOutlineError } from 'react-icons/md'

import { NEXT_URL } from '@config/index'
import {
  reset as resetPartnerState,
  createPartnerData,
  partnerSelector,
} from 'features/partner/partnerSlice'
import RichTextEditor  from '@components/RichText'

const areaOfOperation = [
  'STARTUP',
  'SMALL_BUSINESS',
  'GROWING_BUSINESS',
  'BAME',
  'WOMEN_OWNED',
  'ENTERPRISE',
  'OTHER',
]

const PartnerForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPartnerFormData>()
  const [value, onChange] = useState('')
  const dispatch = useAppDispatch()
  const { isError, error, message, isSuccess } = useAppSelector(partnerSelector)

  useEffect(() => {
    if (isError) {
      showNotification({
        title: 'Error',
        message: error?.message,
        autoClose: 3000,
        color: 'red',
        icon: <MdOutlineError fontSize={18} />,
      })
    }

    if (isSuccess) {
      showNotification({
        title: 'Success',
        message: message,
        autoClose: 3000,
        color: 'red',
        icon: <FaCheckCircle fontSize={18} />,
      })
      router.replace(`${NEXT_URL}/admin/partner-portal`)
    }

    dispatch(resetPartnerState())
  }, [message, isSuccess, isError, error])

  const handleSignUp: SubmitHandler<IPartnerFormData> = async (data) => {}

  const handleImageUpload = async (file: File): Promise<string> => {
      try {
           const formData = new FormData()
           formData.append('image', file)
            return ''
      } catch (error) {
          return ''
      }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex w-full max-w-screen-sm flex-col items-center space-y-2 px-2"
    >
      <TextInput
        id="title"
        aria-label="title"
        placeholder="Enter a title"
        type="text"
        {...register('title', {
          required: true,
          minLength: {
            value: 2,
            message: 'Please enter an title with at least 2 characters',
          },
          pattern: {
            value: /^[A-Za-z0-9 -]+$/,
            message: 'Please enter a title',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.title && (
        <span className="text-center text-sm text-red-500">
          {errors.title?.message || 'title is required'}
        </span>
      )}
      <TextInput
        id="website"
        aria-label="title"
        placeholder="Enter your organisations website"
        type="url"
        {...register('website', {
          required: true,
          pattern: {
            value:
              /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            message: 'Please enter a valid website',
          },
        })}
        className="focus:shadow-outline w-full appearance-none rounded-md focus:outline-none"
      />
      {errors.website && (
        <span className="text-center text-sm text-red-500">
          {errors.website?.message || 'A website is required'}
        </span>
      )}
      <NativeSelect
        id="areaOfOperation"
        data={areaOfOperation}
        placeholder="Select a business type"
        className="w-full"
        {...register('areaOfOperation', { required: true })}
      />
      {errors.areaOfOperation && (
        <span className="text-center text-sm text-red-500">
          Please select a business type
        </span>
      )}
      <RichTextEditor
        value={value}
        onChange={onChange}
        onImageUpload={handleImageUpload}
      />
    </form>
  )
}

export default PartnerForm
