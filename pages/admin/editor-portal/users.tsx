import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import AdminUsersSection from '@components/AdminUsersSection'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'
import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import CreateAdminModal from '@components/AdminUsersSection/CreateAdminModal'
import Button from '@components/Button'

const Users = () => {
  const { data: user, refetch } = useGetUserQuery()
  const [opened, setOpened] = useState(false)
  return (
    <>
    <AdminLayout title="Admin Users">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <PortalHeader user={user as CurrentUser} />
        {user?.isSuperAdmin && (
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-end">
              <Button
                type="button"
                color="primary"
                className="md:w-1/4"
                onClick={() => setOpened((o) => !o)}
              >
                Create Admin
              </Button>
            </div>
          </section>
        )}
        <section className="overflow-y-auto ">
          <h1 className="text-xl font-semibold px-2">Users</h1>
          <AdminUsersSection />
        </section>
      </ComponentShield>
    </AdminLayout>
    <CreateAdminModal opened={opened} setOpened={setOpened} user={user as CurrentUser} refetch={refetch} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}

export default Users
