import { AdminLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import useHasMounted from '@hooks/useHasMounted'

const Advertisements = () => {
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
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="Manage Adverts"
          />
          <section className="overflow-y-auto">
            <h1 className="px-4 text-2xl font-bold">Advertisements</h1>
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

export default Advertisements
