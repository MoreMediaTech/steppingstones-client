'use client'
import { Modal } from '@mantine/core'

import { CurrentUser } from '@lib/types'
import { UpdateUserForm } from 'app/components/forms'

const UpdateAdminUserModal = ({
  open,
  refetch,
  user,
  handleModalClose,
}: {
  open: boolean
  refetch: () => void
  user: CurrentUser
  handleModalClose: () => void
}) => {
  return (
    <Modal
      size="lg"
      opened={open}
      onClose={handleModalClose}
      title="Update User"
    >
      <UpdateUserForm
        refetch={refetch}
        user={user}
        handleModalClose={handleModalClose}
      />
    </Modal>
  )
}

export default UpdateAdminUserModal
