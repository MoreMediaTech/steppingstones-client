import React from 'react'
import { Modal } from '@mantine/core'
import { DistrictDataProps } from '@lib/types'
import { UpdateDistrictForm } from '@components/forms'


const UpdateDistrictModal = ({
  open,
  refetch,
  district,
  handleModalClose,
}: {
  open: boolean
  refetch: () => void
  district: DistrictDataProps
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
      title="Update User"
    >
      <UpdateDistrictForm
        refetch={refetch}
        district={district}
        handleModalClose={handleModalClose}
      />
    </Modal>
  )
}

export default UpdateDistrictModal
