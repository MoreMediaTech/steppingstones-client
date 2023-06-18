'use client'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'

import Header from 'app/components/Header'
import { CountySettings } from './CountySettings'

export default function Page() {
  const { data: user } = useGetUserQuery()

  return (
    <section>
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle="Manage counties"
      />
      <section
        className={`mx-auto my-4 rounded-md border px-2 py-2 sm:max-w-screen-lg sm:px-4`}
      >
        <div className="flex flex-col space-y-4">
          <Header title="County Settings" order={2} />
          <CountySettings />
        </div>
      </section>
    </section>
  )
}
