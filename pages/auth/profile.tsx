import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getUser } from '@lib/getUser'
import { SessionProps } from '@lib/types'
import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'


const Profile = ({ user }: { user: SessionProps }) => {
  return (
    <ComponentShield RBAC  showForRole='PARTNER' userRole={user.role}>
        <AdminLayout>
            <section>
                Partner Portal
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
  
  return {
    props: { user: user as SessionProps },
  }
}

export default Profile