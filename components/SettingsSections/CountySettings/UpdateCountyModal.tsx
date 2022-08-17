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
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
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
