import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { SessionProps } from '@lib/types'
import { ComponentShield } from '@components/NextShield'
import { AdminLayout, MainLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'

const Profile = () => {
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  return (
    <MainLayout title="Profile">
      <section className="flex h-screen items-center justify-center">
        <h1>Welcome {user?.name} to your profile</h1>
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
