import React from 'react'
import { Modal } from '@mantine/core'
import { SectionProps } from '@lib/types'
import { UpdateSectionForm } from '@components/forms'

const UpdateSectionModal = ({
  open,
  refetch,
  section,
  handleModalClose,
}: {
  open: boolean
  refetch: () => void
  section: SectionProps
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
        <UpdateSectionForm refetch={refetch} section={section} handleModalClose={handleModalClose} />
    </Modal>
  )
}

export default UpdateSectionModal