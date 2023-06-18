'use client'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import {RenderInsights }from './Insights'
import { CurrentUser } from '@lib/types'

export default function Insight() {
  const { data: user } = useGetUserQuery()

  return (
    <>
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle="View Insights"
      />
      <section className="mx-auto my-2 w-full overflow-y-auto md:max-w-screen-xl ">
        <RenderInsights />
      </section>
    </>
  )
}
