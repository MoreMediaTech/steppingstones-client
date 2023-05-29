'use client'
import { Box } from '@mantine/core'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import SourceDirectory from '@components/SourceDirectory'
import Header from '@components/Header'

export default function SourceDirectoryPage() {
  const { data: user } = useGetUserQuery()
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
          subTitle="Source Directory"
        />
        <section className="mx-auto my-2 w-full overflow-y-auto px-2 sm:px-4 md:max-w-screen-xl">
          <Box
            sx={{
              marginTop: '1rem',
              marginLeft: '1rem',
              marginRight: '1rem',
              height: '100%',
            }}
          >
            <Header title="Source Directory" order={2} />
            <SourceDirectory />
          </Box>
        </section>
      </section>
    </ComponentShield>
  )
}
