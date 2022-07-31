import { useState } from 'react'
import { Loader } from '@mantine/core'

import AdminUsersTable from './AdminUsersTable'
import { useGetUsersQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'
import { CurrentUser } from '@lib/types'
import UpdateAdminUserModal from './UpdateAdminUserModal'

const AdminUsersSection = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [user, setUserState] = useState<CurrentUser | null>(null)
  const { data: users, isLoading, refetch } = useGetUsersQuery()
  const handleModalClose = () => {
    setOpen(false)
    setUserState(null)
  }

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }
  return (
    <>
      <section className="">
        <AdminUsersTable
          users={users as CurrentUser[]}
          open={open}
          setOpen={setOpen}
          refetch={refetch}
          setUser={setUserState}
        />
      </section>
      <UpdateAdminUserModal
        key={user?.id}
        open={open}
        handleModalClose={handleModalClose}
        refetch={refetch}
        user={user as CurrentUser}
      />
    </>
  )
}

export default AdminUsersSection
