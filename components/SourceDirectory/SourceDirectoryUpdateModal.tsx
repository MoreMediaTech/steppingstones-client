import React from 'react'
import { Modal } from '@mantine/core'
import { useTheme } from 'next-themes'

import SourceDirectoryForm from '@components/forms/SourceDirectoryForm'
import { IFormDataProps } from '.'

const SourceDirectoryUpdateModal = ({
  open,
  action,
  types,
  data,
  refetch,
  handleModalClose,
}: {
  action: string
  open: boolean
  types: string[]
  data: IFormDataProps
  refetch: () => void
  handleModalClose: () => void
}) => {
  const { theme } = useTheme()
  
  return (
    <Modal
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="90%"
      opened={open}
      onClose={handleModalClose}
      title={
        action === 'CREATE' ? (
          <h3 className="mb-4 text-xl font-semibold  capitalize text-gray-900">
            Create Source Directory
          </h3>
        ) : (
          <h3 className="mb-4 text-xl font-semibold  capitalize text-gray-900">
            Update Source Directory
          </h3>
        )
      }
    >
      <SourceDirectoryForm
        currentSDData={data}
        types={types}
        refetch={refetch}
        action={action}
        handleClose={handleModalClose}
      />
    </Modal>
  )
}

export default SourceDirectoryUpdateModal
