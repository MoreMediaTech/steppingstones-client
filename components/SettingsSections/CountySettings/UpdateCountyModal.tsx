'use client';
import React from 'react'
import { Modal } from '@mantine/core'
import { CountyDataProps } from '@lib/types'
import { UpdateCountyForm } from '@components/forms'


const UpdateCountyModal = ({
  open,
  refetch,
  county,
  handleModalClose,
}: {
  open: boolean
  refetch: () => void
  county: CountyDataProps
  handleModalClose: () => void
}) => {
  return (
    <Modal
      size="lg"
      opened={open}
      onClose={handleModalClose}
      title="Update County"
    >
      <UpdateCountyForm
        refetch={refetch}
        county={county}
        handleModalClose={handleModalClose}
      />
    </Modal>
  )
}

export default UpdateCountyModal
