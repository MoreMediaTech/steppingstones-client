import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { SessionProps } from '@lib/types'
import { ComponentShield } from '@components/NextShield'
import { AdminLayout, MainLayout } from 'layout'
import UserProfileSection from '@components/UserProfileSection'
import useHasMounted from '@hooks/useHasMounted'

const Profile = () => {
  const hasMounted = useHasMounted()
  return (
    hasMounted && (
      <MainLayout title="Profile">
        <section className="overflow-auto px-2 sm:px-4">
          <UserProfileSection />
        </section>
      </MainLayout>
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

    props: {}
  }
}

export default Profile
