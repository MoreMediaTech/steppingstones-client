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
              <button
                type="button"
                className=" rounded-md bg-[#5E17EB] px-2 py-2 font-semibold text-white shadow-2xl transition delay-150 duration-300 
              ease-in-out hover:-translate-y-1 hover:scale-y-100 hover:bg-[#3A0B99] md:text-xl "
                onClick={() => setOpened((o) => !o)}
              >
                Create Admin
              </button>
            </div>
          </section>
        )}
        <section className="container mx-auto max-w-screen-xl overflow-auto px-2 lg:px-0 py-6">
          <h1 className="text-xl font-semibold">Users</h1>
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
