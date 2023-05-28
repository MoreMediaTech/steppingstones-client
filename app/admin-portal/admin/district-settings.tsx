import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Box } from '@mantine/core'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { DistrictSettings } from '@components/SettingsSections'
import useHasMounted from '@hooks/useHasMounted'
import Header from '@components/Header'

const DistrictSettingsPage = () => {
  const hasMounted = useHasMounted()
  const { data: user } = useGetUserQuery()

  return (
    hasMounted && (
      <AdminLayout title="Meetings">
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
              subTitle="Manage District Settings"
            />
            <section className="mx-auto mt-2 space-y-4 overflow-y-auto px-2 sm:px-4 md:mt-4 md:max-w-screen-xl">
              <Box
                sx={{
                  marginTop: '1rem',
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  height: '100%',
                }}
              >
                <Header title="District Setting" order={2} />
                <DistrictSettings />
              </Box>
            </section>
          </section>
        </ComponentShield>
      </AdminLayout>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}

export default DistrictSettingsPage
