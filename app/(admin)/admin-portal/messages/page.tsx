'use client'
import { Box } from '@components/mantine-components'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { MessagesSection } from './MessagesSection'
import Header from 'app/components/Header'

export default function Messages() {
  const { data: user, refetch } = useGetUserQuery()

  return (
    <section className="overflow-auto md:h-screen">
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle="View enquires"
      />
      <section className="mx-auto my-2 mb-8 mt-4 space-y-2 overflow-y-auto  rounded-md border py-4 px-2 sm:max-w-screen-xl ">
        <Header title="Enquires" order={2} />
        <MessagesSection />
      </section>
    </section>
  )
}
