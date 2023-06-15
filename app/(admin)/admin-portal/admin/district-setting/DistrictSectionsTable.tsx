'use client'

import {  Loader, Modal } from '@mantine/core'


import { DistrictSectionProps } from '@lib/types'
import {
  useGetDistrictSectionsByDistrictIdQuery,
} from 'app/global-state/features/editor/editorApiSlice'
import UpdateDistrictModal from './UpdateDistrictModal'
import { useAppSelector, useAppDispatch } from '../../../../global-state/hooks'
import {
  editorSelector,
  setDistrictSection,
  setOpenEditModal,
} from 'app/global-state/features/editor/editorSlice'
import { DataTable } from '@components/table/data-table'
import { columns } from './district-section-table-column'

const DistrictSectionsTable = ({
  type,
  setType,
  laName,
  districtId,
  handleModalClose,
  refetch,
}: {
  laName: string
  type: string
  districtId: string
  setType: React.Dispatch<React.SetStateAction<'District' | 'DistrictSection'>>
  handleModalClose: () => void
  refetch: () => void
}) => {

  const {
    data: districtSectionData,
    isLoading: isLoadingDistrictSections,
  } = useGetDistrictSectionsByDistrictIdQuery(districtId)
  const dispatch = useAppDispatch()
  const { districtSection, openLASectionModal, openEditModal } = useAppSelector(editorSelector)


  const handleUpdateModalClose = () => {
    dispatch(setOpenEditModal(false))
    dispatch(setDistrictSection(null))
  }

  return (
    <>
      <Modal
        size="80%"
        opened={openLASectionModal}
        onClose={handleModalClose}
        title={`${laName} LA Sections`}
        centered
        className="dark:bg-slate-800"
      >
        {isLoadingDistrictSections ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={districtSectionData as DistrictSectionProps[]} name='name' />
          </>
        )}
      </Modal>
      <UpdateDistrictModal
        key={districtSection?.id}
        open={openEditModal}
        handleModalClose={handleUpdateModalClose}
        refetch={refetch}
        data={districtSection as DistrictSectionProps}
        type={type}
      />
     
    </>
  )
}

export default DistrictSectionsTable
