import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'

import { PartnerData, PartnerType, ValueCategory } from '@lib/types'
import { PartnerDirectoryForm } from '@components/forms'
import {
  useCreatePartnerDataMutation,
  useGetAllPartnerDataQuery,
} from 'features/partner/partnerApiSlice'

const PartnerDirectorySection = () => {
  const {
    data,
    isLoading: isLoadingPartnerData,
    error,
  } = useGetAllPartnerDataQuery()
  const [createPartnerData, { isLoading }] = useCreatePartnerDataMutation()

  const defaultValues = {
    name: '',
    email: '',
    organisation: '',
    valueCategory: ValueCategory.NONE,
    partnerType: PartnerType.PARTNER,
    position: '',
    projectsResponsibleFor: '',
    closingData: new Date(),
    isEmail: false,
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<PartnerData>>({
    defaultValues: { ...defaultValues },
  })

  const submitHandler: SubmitHandler<Partial<PartnerData>> = useCallback(
    async (data) => {
      const newData = {
        ...data,
      }
      try {
        console.log(newData)
      } catch (error) {
        showNotification({
          message: 'Something went wrong! Please try again',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    []
  )
  return (
    <>
      <PartnerDirectoryForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </>
  )
}

export default PartnerDirectorySection
