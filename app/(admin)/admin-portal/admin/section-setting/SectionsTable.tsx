'use client'
import React, { useState, useCallback } from 'react'
import { showNotification } from '@components/mantine-components'

import { SectionProps } from '@lib/types'
import { useDeleteSectionByIdMutation } from 'app/global-state/features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'

import HandleDeleteModal from '../../../../components/HandleDeleteModal/HandleDeleteModal'
import SubSectionsTable from './SubSectionsTable'

import { DataTable } from '@components/table/data-table'
import { columns } from './table-column'
import {
  setSection,
  setOpenSubSectionModal,
  editorSelector,
} from 'app/global-state/features/editor/editorSlice'

interface ISectionsTableProps {
  sectionsData: SectionProps[]
  refetch: () => void
}

export function SectionsTable({ sectionsData, refetch }: ISectionsTableProps) {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [deleteSectionById, { isLoading }] = useDeleteSectionByIdMutation()
  const { section, openSubSectionModal, openDeleteModal } =
    useAppSelector(editorSelector)

  const handleModalClose = () => {
    dispatch(setOpenSubSectionModal(false))
    dispatch(setSection(null))
  }

  const deleteHandler = useCallback(async (id: string, type?: string) => {
    try {
      const response = await deleteSectionById(id).unwrap()
      refetch()
      setOpenModal(false)
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
      <DataTable columns={columns} data={sectionsData} name="name" />

      {openSubSectionModal && (
        <SubSectionsTable
          sectionId={section?.id as string}
          handleModalClose={handleModalClose}
          refetch={refetch}
          sectionName={section?.name as string}
        />
      )}
      {openModal && (
        <HandleDeleteModal
          open={openDeleteModal}
          data={section}
          deleteHandler={deleteHandler}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default SectionsTable
