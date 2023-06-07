'use client'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { MessagePreviewSection } from 'app/components/MessagesSection'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'

const Message = ({ params }: { params: { id: string } }) => {
  const { data: user, refetch } = useGetUserQuery()

  return (
    <>
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle=""
      />

      <MessagePreviewSection messageId={params.id} />
    </>
  )
}

export default Message
