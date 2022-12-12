import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { MessagesSection } from '@components/MessagesSection'
import useHasMounted from '@hooks/useHasMounted'


const Messages = () => {
  const hasMounted = useHasMounted()
  const { data: user, refetch } = useGetUserQuery()
  
  return hasMounted && (
    <AdminLayout title="Messages">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className='md:h-screen overflow-auto'>

        <PortalHeader
          user={user as CurrentUser}
          imgUrl={user?.imageUrl}
          title={`${user?.name}`}
          subTitle="View enquires"
        />
        <section className="overflow-y-auto my-2 space-y-2">
          <h1 className="px-4 text-2xl font-bold">Enquires</h1>
          <MessagesSection />
        </section>
        </section>
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

  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}


export default Messages