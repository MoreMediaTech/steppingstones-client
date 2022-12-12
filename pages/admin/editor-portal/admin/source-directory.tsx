import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import SourceDirectory from '@components/SourceDirectory'
import useHasMounted from '@hooks/useHasMounted'

const SourceDirectoryPage = () => {
  const hasMounted = useHasMounted()
    const { data: user } = useGetUserQuery()
  return hasMounted && (
    <AdminLayout title="Source Directory">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="md:h-screen overflow-auto">
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="Source Directory"
          />
           <section className="px-2 sm:px-4 mx-auto md:max-w-screen-xl overflow-y-auto w-full my-2">
            <h1 className="text-lg sm:text-2xl font-bold">Source Directory</h1>
            <SourceDirectory />
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

export default SourceDirectoryPage