'use client'
import { Loader } from '@mantine/core'

import { ComponentShield } from 'app/components/NextShield'
import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import PortalSection from 'app/components/PortalHeader/PortalSection'

export default function AdminPortal() {
  const { data: user, isLoading } = useGetUserQuery()
  return (
    <ComponentShield RBAC showForRole={'SS_EDITOR'} userRole={user?.role ?? ''}>
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
  )
}
