import { MessagePreviewSection } from './MessagePreviewSection'

const Message = ({ params }: { params: { id: string } }) => {

  return (
    <>
      <MessagePreviewSection messageId={params.id} />
    </>
  )
}

export default Message
