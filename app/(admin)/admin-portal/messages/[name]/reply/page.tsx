import React from 'react'
import { useSearchParams } from 'next/navigation'
import { MessageReplyForm } from './MessageReplyForm'

export default function Page() {

  return (
    <section className='h-screen overflow-auto p-1 sm:p-2'>
        <MessageReplyForm />
    </section>
  )
}
