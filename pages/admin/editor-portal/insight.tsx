import { AdminLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import RenderInsights from '@components/Insights'
import { CurrentUser } from '@lib/types'
import useHasMounted from '@hooks/useHasMounted'

const Insight = () => {
  const { data: user, refetch } = useGetUserQuery()
  const hasMounted = useHasMounted()

  return (
    hasMounted && (
      <AdminLayout title="Meetings">
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="View Insights"
          />
          <section className="mx-auto my-2 w-full overflow-y-auto md:max-w-screen-xl ">
            <RenderInsights />
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

export default Insight
