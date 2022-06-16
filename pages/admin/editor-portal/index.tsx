import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'
import PortalSection from '@components/PortalSection'


const Dashboard = () => {
  const { data: user, isLoading, isError, error} = useGetUserQuery()
  return (
    <AdminLayout title="Counties - Editor Dashboard" >
      {isLoading && <Spinner classes="w-24 h-24" message="Loading..." />}
      {isError && (
        <div className="flex items-center justify-center">
          An Error has occurred
        </div>
      )}
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <PortalHeader user={user as CurrentUser} />
       <PortalSection />
      </ComponentShield>
    </AdminLayout>
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

  // const user = await getUser(cookies)
  // const userRoles = ['SS_EDITOR', "COUNTY_EDITOR"]

  // if (!user?.isAdmin ) {
  //   return {
  //     redirect: {
  //       destination: '/not-authorized',
  //       permanent: false,
  //     },
  //   }
  // }
  // if (!userRoles.includes(user.role)) {
  //   return {
  //     redirect: {
  //       destination: '/admin',
  //       permanent: false,
  //     },
  //   }
  // }
  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}

export default Dashboard