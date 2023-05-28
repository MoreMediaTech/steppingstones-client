'use client'
import { useState } from 'react'
import { Loader } from '@mantine/core'

import AdminUsersTable from './AdminUsersTable'
import { useGetUsersQuery } from 'app/global-state/features/user/usersApiSlice'
import Spinner from '@components/spinner'
import { CurrentUser } from '@lib/types'
import UpdateAdminUserModal from './UpdateAdminUserModal'

const AdminUsersSection = () => {
  const { data: users, isLoading, refetch } = useGetUsersQuery()
  const [open, setOpen] = useState<boolean>(false)
  const [user, setUserState] = useState<CurrentUser | null>(null)
  const [searchResults, setSearchResults] = useState<CurrentUser[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string[]>([])
  const [checked, setChecked] = useState<boolean>(false)

  const handleModalClose = () => {
    setOpen(false)
    setUserState(null)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(users as CurrentUser[])

    const resultsArray = users?.filter(
      (user: CurrentUser) =>
        user?.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user?.organisation?.name
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        user?.county?.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as CurrentUser[])
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!e.target.checked) {
      setChecked(false)
      setSelectedUserId((userId) => userId.filter((id) => id !== value))
    } else {
      setChecked(true)
      setSelectedUserId((userId) => [...new Set([...userId, value])])
    }
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
          users={
            searchResults.length > 0 ? searchResults : (users as CurrentUser[])
          }
          open={open}
          setOpen={setOpen}
          refetch={refetch}
          setUser={setUserState}
          handleSearch={handleSearch}
          handleSelect={handleSelect}
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
