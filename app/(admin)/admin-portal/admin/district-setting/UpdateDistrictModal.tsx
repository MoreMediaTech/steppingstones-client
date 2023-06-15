'use client'
import React from 'react'
import { Modal } from '@mantine/core'
import { DistrictDataProps, SectionProps } from '@lib/types'
import { UpdateDistrictForm } from 'app/components/forms'

const UpdateDistrictModal = ({
  open,
  refetch,
  data,
  handleModalClose,
  type,
}: {
  type: string
  open: boolean
  refetch: () => void
  data: DistrictDataProps | SectionProps
  handleModalClose: () => void
}) => {
  return (
    <Modal
      size="lg"
      opened={open}
      onClose={handleModalClose}
      title={
        type === 'District' ? 'Update District' : 'Update District Section'
      }
    >
      <UpdateDistrictForm
        refetch={refetch}
        dataParams={data}
        handleModalClose={handleModalClose}
        type={type}
      />
    </Modal>
  )
}

export default UpdateDistrictModal
