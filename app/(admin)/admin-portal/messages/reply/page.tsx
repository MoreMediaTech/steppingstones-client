import React from 'react'
import { useSearchParams } from 'next/navigation'
import { MessageReplyForm } from './MessageReplyForm'

export default function Page() {

  return (
    <section>
        <MessageReplyForm />
    </section>
  )
}
