'use client'
import React from 'react'
import { Modal } from '@mantine/core'
import { useTheme } from 'next-themes'

import { SourceDirectoryForm } from 'app/(admin)/admin-portal/admin/source-directory/SourceDirectoryForm'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  setType,
  editorSelector,
  setOpenEditModal,
} from 'app/global-state/features/editor/editorSlice'

const SourceDirectoryUpdateModal = ({
  types,
  refetch,
}: {
  types: string[]
  refetch: () => void
}) => {
  const dispatch = useAppDispatch()
  const { openEditModal, type } = useAppSelector(editorSelector)

  const handleModalClose = React.useCallback(() => {
    dispatch(setOpenEditModal(false))
    dispatch(setType('Create'))
  }, [])

  return (
    <Modal
      size="50%"
      centered
      opened={openEditModal}
      onClose={handleModalClose}
      title={
        type === 'Create' ? (
          <h3 className="mb-4 text-xl font-semibold  capitalize text-gray-900 dark:text-gray-200">
            Create Source Directory
          </h3>
        ) : (
          <h3 className="mb-4 text-xl font-semibold  capitalize text-gray-900 dark:text-gray-200">
            Update Source Directory
          </h3>
        )
      }
    >
      <SourceDirectoryForm
        types={types}
        refetch={refetch}
        action={type}
        handleClose={handleModalClose}
      />
    </Modal>
  )
}

export default SourceDirectoryUpdateModal
