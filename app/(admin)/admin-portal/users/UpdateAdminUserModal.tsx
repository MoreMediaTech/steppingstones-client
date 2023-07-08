'use client'
import { Modal } from '@mantine/core'

import UpdateUserForm from './UpdateUserForm'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

const UpdateAdminUserModal = ({
  open,
  refetch,
  user,
  handleModalClose,
}: {
  open: boolean
  refetch: () => void
  user: UserSchemaWithIdAndOrganisationType
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

      />
    </Modal>
  )
}

export default UpdateAdminUserModal
