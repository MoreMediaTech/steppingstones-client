import { getUser } from '@lib/getUser'
import Link from 'next/link'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { SessionProps } from '@lib/types'
import { Button } from '@mantine/core'
import { AdminLayout } from 'layout'

const AdminHome = ({ user }: { user: SessionProps}) => {
  return (
    <AdminLayout title="Admin Home">
      <section>
        <div>
          <h1>
            Welcome to the <span>SteppingStones App</span> SteppingStones App
            portal
          </h1>
        </div>
        <div>
          {user.isAdmin && user.role === 'PARTNER' ? (
            <div>
              <Button>
                <Link href={'/admin/partner-portal'}>
                  <a>Go to My Partner Portal</a>
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              <Button>
                <Link href={'/admin/dashboard'}>
                  <a>Go to My Dashboard</a>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const cookies = req.cookies.ss_access_token

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  const user = await getUser(cookies)
   if (!user?.isAdmin) {
     return {
       redirect: {
         destination: '/not-authorized',
         permanent: false,
       },
     }
   }
  return {
    props: { user: user as SessionProps },
  }
}

export default AdminHome