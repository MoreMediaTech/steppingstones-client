'use client'
import { Box } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { MessagesSection } from '@components/MessagesSection'
import Header from '@components/Header'

export default function Messages(){
  const { data: user, refetch } = useGetUserQuery()

  return (
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
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
        </ComponentShield>
  )
}


