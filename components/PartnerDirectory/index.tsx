import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'

import { PartnerData, PartnerType, ValueCategory, IFormData } from '@lib/types'
import { PartnerDirectoryForm } from '@components/forms'
import {
  useCreatePartnerDataMutation,
  useGetAllPartnersDataQuery,
} from 'features/partner/partnerApiSlice'
import PartnerDirectoryTable from './PartnerDirectoryTable'

const PartnerDirectorySection = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [partner, setPartner] = useState<PartnerData | null>(null)
  const {
    data,
    isLoading: isLoadingPartnerData,
    error,
    refetch,
  } = useGetAllPartnersDataQuery()

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
  } = useForm<IFormData>({
    defaultValues: { ...defaultValues },
  })

  const submitHandler: SubmitHandler<IFormData> = useCallback(async (data) => {
    const newData = {
      ...data,
    }
    try {
      const response = await createPartnerData(newData).unwrap()
      reset()
      refetch()
    } catch (error) {
      showNotification({
        message: 'Something went wrong! Please try again',
        autoClose: 3000,
        color: 'red',
      })
    }
  }, [])
  return (
    <>
      <PartnerDirectoryForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
      
        <PartnerDirectoryTable
          setOpen={setOpen}
          refetch={refetch}
          partnerData={data as PartnerData[]}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setPartner={setPartner}
        />
    </>
  )
}

export default PartnerDirectorySection
