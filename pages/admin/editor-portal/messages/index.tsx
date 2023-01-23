import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Box } from '@mantine/core'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { MessagesSection } from '@components/MessagesSection'
import useHasMounted from '@hooks/useHasMounted'
import Header from '@components/Header'

const Messages = () => {
  const hasMounted = useHasMounted()
  const { data: user, refetch } = useGetUserQuery()

  return (
    hasMounted && (
      <AdminLayout title="Messages">
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
          <section className="overflow-auto dark:bg-primary-dark-800 md:h-screen">
            <PortalHeader
              user={user as CurrentUser}
              imgUrl={user?.imageUrl}
              title={`${user?.name}`}
              subTitle="View enquires"
            />
            <section className="overflow-y-auto dark:bg-primary-dark-800 my-2 space-y-2">
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

export default Messages
