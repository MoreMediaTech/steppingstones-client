'use client'
import { Loader } from '@mantine/core'

import AdminUsersTable from './AdminUsersTable'
import { useGetUsersQuery } from 'app/global-state/features/user/usersApiSlice'

import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

export function AdminUsersSection(){
  const dispatch = useAppDispatch()
  const { data: users, isLoading, refetch } = useGetUsersQuery()

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
          users={users as UserSchemaWithIdAndOrganisationType[]}
        />
      </section>
    </>
  )
}

