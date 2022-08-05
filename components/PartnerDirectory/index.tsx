import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'

import { PartnerData, PartnerType, ValueCategory, IFormData } from '@lib/types'
import { PartnerDirectoryForm } from '@components/forms'
import {
  useCreatePartnerDataMutation,
  useGetAllPartnersDataQuery,
  useUpdatePartnerDataMutation,
} from 'features/partner/partnerApiSlice'
import PartnerDirectoryTable from './PartnerDirectoryTable'
import PartnerDirectoryModal from './PartnerDirectoryModal'
import { Loader } from '@mantine/core'
import {
  partnerSelector,
  setPartnerData,
  setType,
} from 'features/partner/partnerSlice'
import { useAppSelector, useAppDispatch } from 'app/hooks'

interface IPartnerDirectoryFormProps {
  isPartnerDirectoryModalOpen: boolean
  setIsPartnerDirectoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PartnerDirectorySection = ({
  isPartnerDirectoryModalOpen,
  setIsPartnerDirectoryModalOpen,
}: IPartnerDirectoryFormProps) => {
  const dispatch = useAppDispatch()
  const {
    data,
    isLoading: isLoadingPartnerData,
    error,
    refetch,
  } = useGetAllPartnersDataQuery()
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResults, setSearchResults] = useState<PartnerData[]>(
    data as PartnerData[]
  )
  const [selectedPartnersId, setSelectedPartnersId] = useState<string[]>([])
 
  const [checked, setChecked] = useState<boolean>(false)
  const { partnerData, type } = useAppSelector(partnerSelector)


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(data as PartnerData[])

    const resultsArray = data?.filter(
      (partner: PartnerData) =>
        partner?.partner?.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        partner?.partner?.email
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        partner?.organisation?.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        partner?.valueCategory
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        partner?.position?.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as PartnerData[])
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.checked) {
      setChecked(false)
      setSelectedPartnersId([])
    }
    const { value } = e.target
    setChecked(true)
    setSelectedPartnersId(partnerId => [...new Set([...partnerId, value])])
  }

  const [createPartnerData, { isLoading }] = useCreatePartnerDataMutation()
  const [updatePartnerData, { isLoading: isLoadingUpdate }] =
    useUpdatePartnerDataMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  const handleModalClose = () => {
    dispatch(setPartnerData(null))
    dispatch(setType('Create'))
    setIsPartnerDirectoryModalOpen(false)
    reset()
  }

  useEffect(() => {
    if (type === 'Create') {
      reset({
        name: '',
        email: '',
        organisation: '',
        valueCategory: ValueCategory.NONE,
        partnerType: PartnerType.NONE,
        position: '',
        projectsResponsibleFor: '',
        closingDate: new Date(),
        isEmail: false,
      })
    }
    if (type === 'Update') {
      reset({
        name: partnerData?.partner?.name,
        email: partnerData?.partner?.email,
        organisation: partnerData?.organisation?.name,
        valueCategory: partnerData?.valueCategory,
        partnerType: partnerData?.partnerType,
        position: partnerData?.position,
        projectsResponsibleFor: partnerData?.projectsResponsibleFor,
        closingDate: new Date(partnerData?.closingDate as Date),
        isEmail: partnerData?.isEmail,
      })
    }
  }, [type])

  const submitHandler: SubmitHandler<IFormData> = useCallback(async (data) => {
    const newData = {
      ...data,
    }
    let response
    try {
      if (type === 'Create') {
        response = await createPartnerData(newData).unwrap()
      }
      if (type === 'Update') {
        response = await updatePartnerData(newData).unwrap()
      }
      reset()
      refetch()
      showNotification({
        message: response?.message,
        color: 'green',
        autoClose: 3000,
      })
    } catch (error) {
      showNotification({
        message: 'Something went wrong! Please try again',
        autoClose: 3000,
        color: 'red',
      })
    }
  }, [])

  if (isLoadingPartnerData) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }
  return (
    <>
      <PartnerDirectoryTable
        setOpen={setIsPartnerDirectoryModalOpen}
        refetch={refetch}
        partnerData={searchResults as PartnerData[]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleSelected={handleSelect}
      />

      {isPartnerDirectoryModalOpen && (
        <PartnerDirectoryModal
          type={type}
          open={isPartnerDirectoryModalOpen}
          handleModalClose={handleModalClose}
          register={register}
          errors={errors}
          refetch={refetch}
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          isLoading={type === 'Create' ? isLoading : isLoadingUpdate}
        />
      )}
    </>
  )
}

export default PartnerDirectorySection
