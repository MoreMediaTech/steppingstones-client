'use client'
import { Loader } from '@mantine/core'

import AdminUsersTable from './AdminUsersTable'
import { useGetUsersQuery } from 'app/global-state/features/user/usersApiSlice'
import { CurrentUser } from '@lib/types'
import UpdateAdminUserModal from './UpdateAdminUserModal'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  globalSelector,
  setOpenModal,
} from 'app/global-state/features/global/globalSlice'
import { userSelector, setUser } from 'app/global-state/features/user/userSlice'

export function AdminUsersSection(){
  const dispatch = useAppDispatch()
  const { data: users, isLoading, refetch } = useGetUsersQuery()
  const { openModal } = useAppSelector(globalSelector)
  const { user: currentUser } = useAppSelector(userSelector)

  const handleModalClose = () => {
    dispatch(setOpenModal(false))
    dispatch(setUser(null))
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
        <AdminUsersTable users={users as CurrentUser[]} />
      </section>
      <UpdateAdminUserModal
        key={currentUser?.id}
        open={openModal}
        handleModalClose={handleModalClose}
        refetch={refetch}
        user={currentUser as CurrentUser}
      />
    </>
  )
}

