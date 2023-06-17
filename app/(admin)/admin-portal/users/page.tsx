'use client'
import { useState } from 'react'
import { Box } from '@components/mantine-components'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { AdminUsersSection } from './AdminUsersSection'
import PortalHeader from 'app/components/PortalHeader'
import Header from 'app/components/Header'
import { Button } from '@components/ui/button'
import CreateAdminModal from 'app/(admin)/admin-portal/users/CreateAdminModal'
import { CurrentUser } from '@lib/types'

export default function Users() {
  const { data: user, refetch } = useGetUserQuery()
  const [opened, setOpened] = useState(false)
  return (
    <>
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle="Manage application users"
      />
      <section className="my-4 space-y-4 overflow-y-auto mt-4 mb-8 overflow-x-hidden rounded-md border px-2 py-2 sm:mx-auto sm:max-w-screen-lg sm:px-4">
        <div className="grid grid-cols-1">
          <div className="flex w-full items-center justify-between py-4">
            <Header title="Users" order={2} />
            {user?.isSuperAdmin && (
              <Button
                className="w-32 text-xs"
                onClick={() => setOpened((o) => !o)}
              >
                Create Admin
              </Button>
            )}
          </div>
          <AdminUsersSection />
        </div>
      </section>
      <CreateAdminModal
        opened={opened}
        setOpened={setOpened}
        user={user as CurrentUser}
        refetch={refetch}
      />
    </>
  )
}
