'use client'
import React, { useCallback } from 'react'

import { showNotification, Loader, Modal } from '@components/mantine-components'
import { SubSectionProps } from '@lib/types'
import {
  useDeleteSubSectionByIdMutation,
  useGetSubSectionsBySectionIdQuery,
  useDeleteManySubSectionsMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  editorSelector,
  setOpenEditModal,
  setOpenDeleteModal,
  setSubSection,
} from 'app/global-state/features/editor/editorSlice'
import HandleDeleteModal from '../../../../components/HandleDeleteModal/HandleDeleteModal'
import UpdateSectionModal from './UpdateSectionModal'
import { columns } from './sub-section-table-column'
import { DataTable } from '@components/table/data-table'

const SubSectionsTable = ({
  sectionName,
  sectionId,
  handleModalClose,
  refetch,
}: {
  sectionName: string
  sectionId: string
  handleModalClose: () => void
  refetch: () => void
}) => {
  const dispatch = useAppDispatch()

  const {
    sectionType,
    subSection,
    openSubSectionModal,
    openEditModal,
    openDeleteModal,
  } = useAppSelector(editorSelector)
  const {
    data: subSectionData,
    isLoading: isLoadingSubSections,
    refetch: refetchSubSection,
  } = useGetSubSectionsBySectionIdQuery(sectionId)

  const [deleteSubSectionById, { isLoading }] =
    useDeleteSubSectionByIdMutation()
  const [deleteManySubSections] = useDeleteManySubSectionsMutation()

  const handleUpdateModalClose = () => {
    dispatch(setOpenEditModal(false))
    dispatch(setSubSection(null))
  }

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await deleteSubSectionById(id).unwrap()
      refetchSubSection()
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

  const handleDeleteMany = useCallback(async (rows: SubSectionProps[]) => {
    const selectedSectionIds = rows.map((row) => row.id)
    try {
      const response = await deleteManySubSections(selectedSectionIds).unwrap()
      if (response.success) {
        showNotification({
          message: 'Successfully deleted Partner Directory entries',
          color: 'success',
          autoClose: 3000,
        })
        refetchSubSection()
      }
    } catch (error) {
      showNotification({
        message: 'Error deleting Partner Directory Data',
        color: 'error',
        autoClose: 3000,
      })
    }
  }, [])

  return (
    <>
      <Modal
        size="80%"
        opened={openSubSectionModal}
        onClose={handleModalClose}
        title={`${sectionName} LA Sections`}
        centered
      >
        {isLoadingSubSections ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={subSectionData as SubSectionProps[]}
              name="name"
              handleDeleteManyById={handleDeleteMany}
            />
          </>
        )}
      </Modal>
      {openEditModal && (
        <UpdateSectionModal
          key={subSection?.id}
          open={openEditModal}
          handleModalClose={handleUpdateModalClose}
          refetch={refetchSubSection}
          data={subSection as SubSectionProps}
          type={sectionType}
        />
      )}
      {openDeleteModal && (
        <HandleDeleteModal
          open={openDeleteModal}
          data={subSection as SubSectionProps}
          deleteHandler={deleteHandler}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default SubSectionsTable
