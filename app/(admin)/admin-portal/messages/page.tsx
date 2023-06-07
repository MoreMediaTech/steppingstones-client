'use client'
import { Box } from '@components/mantine-components'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { MessagesSection } from 'app/components/MessagesSection'
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
      <section className="my-2 space-y-2 overflow-y-auto ">
        <Box
          sx={{
            marginTop: '1rem',
            marginLeft: '1rem',
            marginRight: '1rem',
            height: '100%',
          }}
        >
          <Header title="Enquires" order={2} />
          <MessagesSection />
        </Box>
      </section>
    </section>
  )
}
