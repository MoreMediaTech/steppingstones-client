'use client'
import { useState } from 'react'
import { Box } from '@components/mantine-components'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import AdminUsersSection from 'app/components/AdminUsersSection'
import PortalHeader from 'app/components/PortalHeader'
import Header from 'app/components/Header'
import Button from 'app/components/Button'
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
      <section className="mx-auto max-w-screen-lg space-y-4 overflow-y-auto px-2 sm:px-4">
        <Box
          sx={{
            marginTop: '1rem',
            marginLeft: '1rem',
            marginRight: '1rem',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}
          >
            <Header title="Users" order={2} />
            {user?.isSuperAdmin && (
              <Button
                type="button"
                color="outline"
                className="md:w-1/4"
                onClick={() => setOpened((o) => !o)}
              >
                Create Admin
              </Button>
            )}
          </Box>
          <AdminUsersSection />
        </Box>
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
