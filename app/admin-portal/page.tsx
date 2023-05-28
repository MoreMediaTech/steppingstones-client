import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import PortalSection from '@components/PortalSection'
import useHasMounted from '@hooks/useHasMounted'

const Dashboard = () => {
  const hasMounted = useHasMounted()
  const { data: user, isLoading } = useGetUserQuery()
  return (
    hasMounted && (
      <AdminLayout title="Counties - Editor Dashboard">
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
          {isLoading ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <PortalSection />
          )}
        </ComponentShield>
      </AdminLayout>
    )
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
