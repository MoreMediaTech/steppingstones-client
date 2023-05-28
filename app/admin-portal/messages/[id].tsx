import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { MessagePreviewSection } from '@components/MessagesSection'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import useHasMounted from '@hooks/useHasMounted'

const Message = ({ messageId }: { messageId: string }) => {
  const hasMounted = useHasMounted()
  const { data: user, refetch } = useGetUserQuery()

  return (
    hasMounted && (
      <AdminLayout title="Message">
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle=""
          />

          <MessagePreviewSection messageId={messageId} />
        </ComponentShield>
      </AdminLayout>
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
    props: {
      messageId: context?.params?.id,
    },
  }
}

export default Message
