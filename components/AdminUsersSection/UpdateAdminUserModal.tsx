import { Modal } from '@mantine/core'

import { CurrentUser } from '@lib/types'
import { UpdateUserForm } from '@components/forms'

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
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
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
