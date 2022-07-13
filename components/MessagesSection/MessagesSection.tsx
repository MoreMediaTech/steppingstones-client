import React from 'react'
import { useGetAllMailQuery } from 'features/email/emailApiSlice'
import MessagesTable from './MessagesTable'
import { MessageProps } from '@lib/types'
import Spinner from '@components/spinner'

const MessagesSection = () => {
  const { data: messages, isLoading } = useGetAllMailQuery()

  if (isLoading) {
    return (
      <div className="item-center flex h-[700px] justify-center">
        <Spinner classes="h-24 w-24" message="loading messages..." />
      </div>
    )
  }
  return (
    <section className="w-full bg-slate-50">
      <MessagesTable messages={messages as MessageProps[]} />
    </section>
  )
}

export default MessagesSection
