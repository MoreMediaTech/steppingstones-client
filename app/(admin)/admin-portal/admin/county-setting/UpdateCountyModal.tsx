'use client'
import React from 'react'
import { Modal } from '@mantine/core'
import { CountyDataProps } from '@lib/types'
import { UpdateCountyForm } from 'app/components/forms'

type Props = {
  open: boolean
  refetch: () => void
  county: CountyDataProps
  handleModalClose: () => void
}

export function UpdateCountyModal({
  open,
  refetch,
  county,
  handleModalClose,
}: Props) {
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

