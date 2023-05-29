'use client'
import { Box } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { SectionsSettings } from '@components/SettingsSections'

import Header from '@components/Header'

export default function SectionSettingsPage() {
  const { data: user } = useGetUserQuery()

  return (
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
          <section className="h-screen overflow-auto">
            <PortalHeader
              user={user as CurrentUser}
              imgUrl={user?.imageUrl}
              title={`${user?.name}`}
              subTitle="Manage Sections"
            />
            <section className="mx-auto mt-2 space-y-4 overflow-y-auto px-2 sm:px-4 md:max-w-screen-xl">
              <Box
                sx={{
                  marginTop: '1rem',
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  height: '100%',
                }}
              >
                <Header title="Section Settings" order={2} />
                <SectionsSettings />
              </Box>
            </section>
          </section>
        </ComponentShield>
  )
}

