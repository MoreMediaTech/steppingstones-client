import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'
import PortalSection from '@components/PortalSection'

const Dashboard = () => {
  const router = useRouter()

  const { data: user, isLoading } = useGetUserQuery()
  return (
    <AdminLayout title="Counties - Editor Dashboard">
      {isLoading && <Spinner classes="w-24 h-24" message="Loading..." />}
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <PortalHeader
          user={user as CurrentUser}
          title={`Welcome ${user?.name}`}
          subTitle="Please select from the menu below"
          imgUrl={user?.imageUrl}
        />
        <PortalSection />
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
    props: {},
  }
}

export default Dashboard
