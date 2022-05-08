import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getUser } from '@lib/getUser'
import { SessionProps } from '@lib/types'
import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'


const Dashboard = ({ user} : { user: SessionProps}) => {
  return (
    <ComponentShield RBAC showForRole={"SS_EDITOR"} userRole={user.role}>
      <AdminLayout title="Editor Dashboard">
        <section className="flex h-full items-center justify-center">
          <div className="">
            <h1>
              Welcome <span className="uppercase">{user.name}</span> to the
              Editor Dashboard
            </h1>
          </div>
        </section>
      </AdminLayout>
    </ComponentShield>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_access_token

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  const user = await getUser(cookies)
  const userRoles = ['SS_EDITOR', "COUNTY_EDITOR"]

  if (!user?.isAdmin ) {
    return {
      redirect: {
        destination: '/not-authorized',
        permanent: false,
      },
    }
  }
  if (!userRoles.includes(user.role)) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }
  return {
    props: { user: user as SessionProps },
  }
}

export default Dashboard