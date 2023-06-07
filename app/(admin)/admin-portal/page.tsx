'use client'
import { Loader } from '@components/mantine-components'

import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import PortalSection from 'app/components/PortalHeader/PortalSection'

export default function AdminPortal() {
  const { data: user, isLoading } = useGetUserQuery()
  return (
    <>
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
    </>
  )
}
