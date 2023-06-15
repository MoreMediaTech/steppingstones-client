'use client'
import React, { useCallback } from 'react'

import { CountyDataProps } from '@lib/types'
import { useRemoveCountyMutation } from 'app/global-state/features/editor/editorApiSlice'
import { showNotification } from '@mantine/notifications'
import HandleDeleteModal from '../../../../components/HandleDeleteModal/HandleDeleteModal'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  editorSelector,
  setOpenDeleteModal,
} from 'app/global-state/features/editor/editorSlice'
import { columns } from './table-columns'
import { DataTable } from '@components/table/data-table'

interface CountyTableProps {
  countyData: CountyDataProps[]
  refetch: () => void
}

export function CountyTable({ countyData, refetch }: CountyTableProps){
  const dispatch = useAppDispatch()

  const [removeCounty, { isLoading }] = useRemoveCountyMutation()
  const { county, openDeleteModal } = useAppSelector(editorSelector)

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await removeCounty(id).unwrap()
      refetch()
      dispatch(setOpenDeleteModal(false))
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
      <DataTable columns={columns} data={countyData} name="name" />

      {openDeleteModal && (
        <HandleDeleteModal
          open={openDeleteModal}
          data={county}
          deleteHandler={deleteHandler}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

