import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'


import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import AdminUsersSection from '@components/AdminUsersSection'
import PortalHeader from '@components/PortalHeader'
import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import CreateAdminModal from '@components/AdminUsersSection/CreateAdminModal'
import Button from '@components/Button'
import useHasMounted from '@hooks/useHasMounted'

const Users = () => {
  const hasMounted = useHasMounted();
  const { data: user, refetch } = useGetUserQuery()
  const [opened, setOpened] = useState(false)
  return hasMounted && (
    <>
      <AdminLayout title="Admin Users">
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="Manage application users"
          />
          <section className="mx-auto max-w-screen-xl overflow-y-auto px-2 sm:px-4 space-y-4">
            <div className="flex items-center justify-between py-2">
              <h1 className="px-2 text-xl font-semibold md:text-2xl">Users</h1>
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
            </div>
            <AdminUsersSection />
          </section>
        </ComponentShield>
      </AdminLayout>
      <CreateAdminModal
        opened={opened}
        setOpened={setOpened}
        user={user as CurrentUser}
        refetch={refetch}
      />
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
