import { useState } from 'react'

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
  return (
    <>
      <section className="container mx-auto max-w-screen-xl ">
        {isLoading ? (
          <Spinner classes="w-24 h-24" message="Loading users..." />
        ) : (
          <AdminUsersTable
            users={users as CurrentUser[]}
            open={open}
            setOpen={setOpen}
            refetch={refetch}
            setUser={setUserState}
          />
        )}
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
