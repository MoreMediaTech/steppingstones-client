import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { SessionProps } from '@lib/types'
import { ComponentShield } from '@components/NextShield'
import { AdminLayout, MainLayout } from 'layout'
import UserProfileSection from '@components/UserProfileSection'

const Profile = () => {
  
  return (
    <MainLayout title="Profile">
      <section className="overflow-auto">
        <UserProfileSection />
      </section>
    </MainLayout>
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

  return {
    // props: { user: user as SessionProps },
    props: {}
  }
}

export default Profile
