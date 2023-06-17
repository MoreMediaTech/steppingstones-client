'use client'
import React, { MouseEventHandler, useCallback, useState, useRef } from 'react'
import { showNotification } from '@components/mantine-components'

import HandleDeleteModal from 'app/components/HandleDeleteModal'
import { SourceDataProps } from '@lib/types'
import { useDeleteSDDataMutation } from 'app/global-state/features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  setSDData,
  editorSelector,
  setOpenDeleteModal,
} from 'app/global-state/features/editor/editorSlice'
import { columns } from './table-column'
import { DataTable } from '@components/table/data-table'

interface ISourceDirectoryTableProps {
  data: SourceDataProps[]
  refetch: () => void
}

export function SourceDirectoryTable({
  data,
  refetch,
}: ISourceDirectoryTableProps){
  const dispatch = useAppDispatch()
  const [deleteSDData, { isLoading }] = useDeleteSDDataMutation()
  const { sdData, openDeleteModal } = useAppSelector(editorSelector)

  const deleteHandler = useCallback(async (id: string, type?: string) => {
    const newData = {
      id,
      type,
    }
    try {
      const response = await deleteSDData(newData).unwrap()
      refetch()
      dispatch(setOpenDeleteModal(false))
      dispatch(setSDData(null))
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
      <DataTable columns={columns} data={data} name="description" />
      <HandleDeleteModal
        open={openDeleteModal}
        data={sdData}
        deleteHandler={deleteHandler}
        isLoading={isLoading}
      />
    </>
  )
}


