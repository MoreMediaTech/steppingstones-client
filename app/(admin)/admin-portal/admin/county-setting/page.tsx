'use client'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { CountySettings } from 'app/components/SettingsSections'
import Header from 'app/components/Header'

export default function Page() {
  const { data: user } = useGetUserQuery()

  return (
    <section className="">
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle="Manage counties"
      />
      <section
        className={`mx-auto my-4 py-2 px-2 sm:px-4 sm:max-w-screen-md border rounded-md`}
      >
        <div className="flex flex-col space-y-4">
          <Header title="County Settings" order={2} />
          <CountySettings />
        </div>
      </section>
    </section>
  )
}
