'use client'
import React, { useCallback, useState } from 'react'
import HandleDeleteModal from 'app/components/HandleDeleteModal'
import { showNotification } from '@mantine/notifications'
import { PartnerData } from '@lib/types'
import { useDeletePartnerDataMutation } from 'app/global-state/features/partner/partnerApiSlice'

import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  editorSelector,
  setPartner,
  setOpenDeleteModal,
} from 'app/global-state/features/editor/editorSlice'
import { columns } from './table-column'
import { DataTable } from '@components/table/data-table'


interface PartnerDirectoryTableProps {
  partnerData: PartnerData[]
  refetch: () => void
}

export function PartnerDirectoryTable({
  partnerData,
  refetch,
}: PartnerDirectoryTableProps) {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [deletePartnerData, { isLoading }] = useDeletePartnerDataMutation()
  const { openDeleteModal, partner } = useAppSelector(editorSelector)

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await deletePartnerData(id).unwrap()
      refetch()
      dispatch(setOpenDeleteModal(false))
      dispatch(setPartner(null))
      showNotification({
        message: response.message ?? 'Section deleted successfully',
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
      <DataTable
        columns={columns}
        data={partnerData}
        name={'organisation' || 'projectsResponsibleFor' || 'createdAt'}
      />
      <HandleDeleteModal
        open={openDeleteModal}
        data={partner}
        deleteHandler={deleteHandler}
        isLoading={isLoading}
      />
    </>
  )
}

