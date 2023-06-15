'use client'
import { Box } from '@mantine/core'

import { ComponentShield } from 'app/components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { DistrictSettings } from './DistrictSettings'
import Header from 'app/components/Header'

export default function Page() {
  const { data: user } = useGetUserQuery()

  return (
    <section className="h-screen overflow-auto">
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle="Manage District Settings"
      />
      <section className="mx-auto my-2 py-4 overflow-y-auto px-2 sm:px-4 sm:my-4 sm:max-w-screen-md border rounded-md">
        <div className='grid grid-cols-1 gap2'>
          <Header title="District Setting" order={2} />
          <DistrictSettings />
        </div>
      </section>
    </section>
  )
}
