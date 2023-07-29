'use client'
import { useForm } from 'react-hook-form'

import { PartnerData, IFormData } from '@lib/types'
import { useGetAllPartnersDataQuery } from 'app/global-state/features/partner/partnerApiSlice'
import { PartnerDirectoryTable } from './PartnerDirectoryTable'
import PartnerDirectoryModal from './PartnerDirectoryModal'
import { Loader } from '@components/mantine-components'
import { useAppSelector, useAppDispatch } from 'app/global-state/hooks'
import {
  editorSelector,
  setOpenEditModal,
  setPartner,
  setType,
} from 'app/global-state/features/editor/editorSlice'

export function PartnerDirectorySection() {
  const dispatch = useAppDispatch()
  const {
    data,
    isLoading: isLoadingPartnerData,
    refetch,
  } = useGetAllPartnersDataQuery()
  const { openEditModal } = useAppSelector(editorSelector)

  const { reset } = useForm<IFormData>()

  // function that handles the close of the updateCountyModal and resets the partnerData state
  const handleModalClose = () => {
    dispatch(setPartner(null))
    dispatch(setType('Create'))
    dispatch(setOpenEditModal(false))
    reset()
  }

  // Function to delete the selected partners
  // const handleDeleteMany = useCallback(async () => {
  //   try {
  //     const response = await deleteManyPartnerData(selectedPartnersId).unwrap()
  //     if (response.success) {
  //       showNotification({
  //         message: 'Successfully deleted Partner Directory entries',
  //         color: 'success',
  //         autoClose: 3000,
  //       })
  //       refetch()
  //       setChecked(false)
  //       setSelectedPartnersId([])
  //     }
  //   } catch (error) {
  //     showNotification({
  //       message: 'Error deleting Partner Directory Data',
  //       color: 'error',
  //       autoClose: 3000,
  //     })
  //   }
  // }, [checked, selectedPartnersId])

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
        refetch={refetch}
        partnerData={data as PartnerData[]}
      />

      {openEditModal && (
        <PartnerDirectoryModal
          open={openEditModal}
          handleModalClose={handleModalClose}
          refetch={refetch}
        />
      )}
    </>
  )
}
