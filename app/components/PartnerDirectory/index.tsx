'use client'
import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'

import { PartnerData, PartnerType, ValueCategory, IFormData } from '@lib/types'
import {
  useCreatePartnerDataMutation,
  useGetAllPartnersDataQuery,
  useUpdatePartnerDataMutation,
  useDeleteManyPartnerDataMutation,
} from 'app/global-state/features/partner/partnerApiSlice'
import PartnerDirectoryTable from './PartnerDirectoryTable'
import PartnerDirectoryModal from './PartnerDirectoryModal'
import { Loader } from '@mantine/core'
import {
  partnerSelector,
  setPartnerData,
  setType,
} from 'app/global-state/features/partner/partnerSlice'
import { useAppSelector, useAppDispatch } from 'app/global-state/hooks'

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
  const [searchResults, setSearchResults] = useState<PartnerData[]>([])
  const [selectedPartnersId, setSelectedPartnersId] = useState<string[]>([])
  const [checked, setChecked] = useState<boolean>(false)
  const { partnerData, type } = useAppSelector(partnerSelector)

  const [createPartnerData, { isLoading }] = useCreatePartnerDataMutation()
  const [updatePartnerData, { isLoading: isLoadingUpdate }] =
    useUpdatePartnerDataMutation()
  const [deleteManyPartnerData, { isLoading: isDeleting }] =
    useDeleteManyPartnerDataMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  // function that handles the search/filter of the partner data
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
        partner?.position
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        partner?.projectsResponsibleFor
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as PartnerData[])
  }

  // function that handles the selection of the checkbox for the partners table
  // and adds the id to the array of selected partners in setSelectedPartnersId
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setChecked(false)
      setSelectedPartnersId([])
    } else {
      const { value } = e.target
      setChecked(true)
      setSelectedPartnersId((partnerId) => [...new Set([...partnerId, value])])
    }
  }

  // function that handles the close of the updateCountyModal and resets the partnerData state
  const handleModalClose = () => {
    dispatch(setPartnerData(null))
    dispatch(setType('Create'))
    setIsPartnerDirectoryModalOpen(false)
    reset()
  }

  // function that handles the search/filter of the closingDate in the partner data
  const handleFilterByDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const resultsArray = data?.filter((partner: PartnerData) => {
      return partner?.closingDate === value
    })
    setSearchResults(resultsArray as PartnerData[])
  }

  // if type is create reset the form else if type is update fill the form with the partner data
  useEffect(() => {
    if (type === 'Create') {
      reset({
        name: '',
        email: '',
        organisation: '',
        position: '',
        projectsResponsibleFor: '',
        closingDate: new Date(),
      })
    }
    if (type === 'Update') {
      reset({
        name: partnerData?.partner?.name,
        email: partnerData?.partner?.email,
        organisation: partnerData?.organisation?.name,
        position: partnerData?.position,
        projectsResponsibleFor: partnerData?.projectsResponsibleFor,
        closingDate: new Date(partnerData?.closingDate as Date),
      })
    }
  }, [type])

  // function that handles the creation of a new partner or updates an existing partner
  const submitHandler: SubmitHandler<IFormData> = useCallback(
    async (data) => {
      console.log({ type, data })
      const newData = {
        id: partnerData?.id,
        ...data,
      }
      let response
      try {
        if (type === 'Create') {
          response = await createPartnerData(data).unwrap()
        }
        if (type === 'Update') {
          response = await updatePartnerData(newData).unwrap()
        }
        handleModalClose()
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
    },
    [type]
  )

  // Function to delete the selected partners
  const handleDeleteMany = useCallback(async () => {
    try {
      const response = await deleteManyPartnerData(selectedPartnersId).unwrap()
      if (response.success) {
        showNotification({
          message: 'Successfully deleted Partner Directory entries',
          color: 'success',
          autoClose: 3000,
        })
        refetch()
        setChecked(false)
        setSelectedPartnersId([])
      }
    } catch (error) {
      showNotification({
        message: 'Error deleting Partner Directory Data',
        color: 'error',
        autoClose: 3000,
      })
    }
  }, [checked, selectedPartnersId])

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
        checked={checked}
        setOpen={setIsPartnerDirectoryModalOpen}
        refetch={refetch}
        selectedPartnersId={selectedPartnersId}
        partnerData={
          searchResults.length > 0
            ? (searchResults as PartnerData[])
            : (data as PartnerData[])
        }
        handleSearch={handleSearch}
        handleSelected={handleSelect}
        handleDeleteMany={handleDeleteMany}
        handleFilterByDate={handleFilterByDate}
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
