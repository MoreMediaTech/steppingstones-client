'use client'
import React, { useState, useCallback, MouseEventHandler } from 'react'

import { DistrictDataProps } from '@lib/types'
import { useDeleteDistrictByIdMutation } from 'app/global-state/features/editor/editorApiSlice'
import { showNotification } from '@components/mantine-components'
import HandleDeleteModal from '../../../../components/HandleDeleteModal/HandleDeleteModal'
import DistrictSectionsTable from './DistrictSectionsTable'
import { useAppSelector, useAppDispatch } from '../../../../global-state/hooks'
import {
  editorSelector,
  setDistrict,
  setOpenLASectionModal,
} from '../../../../global-state/features/editor/editorSlice'

import { DataTable } from '@components/table/data-table'
import { columns } from './table-column'

interface IDistrictTableProps {
  type: string
  districtData: DistrictDataProps[]
  refetch: () => void
  setType: React.Dispatch<React.SetStateAction<'District' | 'DistrictSection'>>
}

export function DistrictTable({
  districtData,
  type,
  setType,
  refetch,
}: IDistrictTableProps) {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [deleteDistrictById, { isLoading }] = useDeleteDistrictByIdMutation()
  const { district, districtSection, openLASectionModal, openDeleteModal } =
    useAppSelector(editorSelector)

  const handleModalClose = () => {
    dispatch(setOpenLASectionModal(false))
    dispatch(setDistrict(null))
  }

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await deleteDistrictById(id).unwrap()
      refetch()
      setOpenModal(false)
      showNotification({
        message: 'Section deleted successfully',
        color: 'green',
        autoClose: 3000,
      })
    } catch (error) {
      showNotification({
        message: 'Error deleting section',
        color: 'red',
        autoClose: 3000,
      })
    }
  }, [])
  return (
    <>
      <DataTable columns={columns} data={districtData} name="name" />
      {openLASectionModal ? (
        <DistrictSectionsTable
          districtId={district?.id as string}
          handleModalClose={handleModalClose}
          refetch={refetch}
          laName={district?.name as string}
          type={type}
          setType={setType}
        />
      ) : null}
      {openDeleteModal ? (
        <HandleDeleteModal
          open={openDeleteModal}
          isLoading={isLoading}
          data={district}
          type={type}
          deleteHandler={deleteHandler}
        />
      ) : null}
    </>
  )
}
