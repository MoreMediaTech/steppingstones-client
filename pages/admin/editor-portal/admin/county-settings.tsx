import { useEffect, useState} from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { CountySettings } from '@components/SettingsSections'



const CountySettingsPage = () => {
  const { data: user } = useGetUserQuery()

  return (
    <AdminLayout title="Meetings">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="h-screen overflow-auto">
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="Manage counties"
          />
          <section
            className={`mx-auto mt-2 overflow-hidden space-y-4 overflow-y-auto px-2 sm:px-4 md:max-w-screen-xl`}
          >
            <h1 className="font-poppins text-2xl font-bold">County Setting</h1>
            <CountySettings />
          </section>
        </section>
      </ComponentShield>
    </AdminLayout>
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

export default CountySettingsPage
