'use client'
import { useState } from 'react'
import { Box } from '@components/mantine-components'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import AdminUsersSection from 'app/components/AdminUsersSection'
import PortalHeader from 'app/components/PortalHeader'
import Header from 'app/components/Header'
import {Button} from '@components/ui/button'
import CreateAdminModal from 'app/components/AdminUsersSection/CreateAdminModal'
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
      <section className="sm:mx-auto sm:max-w-screen-md space-y-4 overflow-y-auto overflow-x-hidden px-2 sm:px-4 border my-4 rounded-md py-2">
        <div className="grid grid-cols-1">
          <div
            className="flex justify-between items-center w-full py-4"
          >
            <Header title="Users" order={2} />
            {user?.isSuperAdmin && (
              <Button
              className='text-xs w-32'
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
