'use client';
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { MessagePreviewSection } from '@components/MessagesSection'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'

const Message = ({ params }: { params: { id: string}}) => {

  const { data: user, refetch } = useGetUserQuery()

  return (
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

          <MessagePreviewSection messageId={params.id} />
        </ComponentShield>
  )
}



export default Message
