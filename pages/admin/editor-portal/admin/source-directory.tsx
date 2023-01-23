import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Box } from '@mantine/core'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import SourceDirectory from '@components/SourceDirectory'
import useHasMounted from '@hooks/useHasMounted'
import Header from '@components/Header'

const SourceDirectoryPage = () => {
  const hasMounted = useHasMounted()
  const { data: user } = useGetUserQuery()
  return (
    hasMounted && (
      <AdminLayout title="Source Directory">
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

export default SourceDirectoryPage
