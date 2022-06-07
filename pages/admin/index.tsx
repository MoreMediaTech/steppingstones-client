import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Button } from '@mantine/core'
import { MainLayout } from 'layout'

import { SessionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'

const AdminHome = () => {
  const router = useRouter()
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const routeToDashboard = () => {
    router.push('/admin/editor-portal')
  }

  const routerToPortal = () => {
    router.push('/admin/partner-portal')
  }

  return (
    <MainLayout title="Admin Home">
      <section className="flex h-screen items-center justify-center bg-white">
        {isLoading && <Spinner classes="w-24 h-24" message="Loading..." />}
        {isError && (
          <div className="flex items-center justify-center">
            An Error has occurred
          </div>
        )}
        {user && (
          <div className="flex flex-col space-y-2">
            <div>
              <h1 className="font-mono text-2xl ">
                Welcome {user?.name} to the{' '}
                <span className="text-indigo-900">SteppingStones App</span>{' '}
                portal
              </h1>
            </div>
            <div className="flex items-center justify-center">
              {user?.isAdmin && user?.role === 'PARTNER' ? (
                <Button
                  type="button"
                  fullWidth
                  className="w-full rounded-md border border-indigo-900 bg-indigo-900 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700"
                  onClick={routerToPortal}
                >
                  Go to My Partner Portal
                </Button>
              ) : (
                <Button
                  type="button"
                  fullWidth
                  className="w-full rounded-md border border-indigo-900 bg-indigo-900  text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700"
                  onClick={routeToDashboard}
                >
                  Go to My Dashboard
                </Button>
              )}
            </div>
          </div>
        )}
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
  // if (!user?.isAdmin) {
  //   return {
  //     redirect: {
  //       destination: '/not-authorized',
  //       permanent: false,
  //     },
  //   }
  // }
  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}

export default AdminHome
