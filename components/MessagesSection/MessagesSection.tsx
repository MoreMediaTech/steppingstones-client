import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetAllMailQuery } from 'features/email/emailApiSlice'
import MessagesTable from './MessagesTable'
import { MessageProps } from '@lib/types'


const MessagesSection = () => {
  const { data: messages, isLoading } = useGetAllMailQuery()
  const [searchResults, setSearchResults] = useState<MessageProps[]>([])
  const [selectedMessageId, setSelectedMessageId] = useState<string[]>([])
  const [checked, setChecked] = useState<boolean>(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(messages as MessageProps[])

    const resultsArray = messages?.filter(
      (message: MessageProps) =>
        message?.from.toLowerCase().includes(e.target.value.toLowerCase()) ||
        message?.subject.toLowerCase().includes(e.target.value.toLowerCase()) ||
        message?.message.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as MessageProps[])
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!e.target.checked) {
      setChecked(false)
      setSelectedMessageId((messageId) =>
        messageId.filter((id) => id !== value)
      )
    } else {
      setChecked(true)
      setSelectedMessageId((messageId) => [...new Set([...messageId, value])])
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }
  return (
    <section className="w-full bg-slate-50">
      <MessagesTable
        messages={
          searchResults.length > 0
            ? searchResults
            : (messages as MessageProps[])
        }
        handleSearch={handleSearch}
        handleSelect={handleSelect}
      />
    </section>
  )
}

export default MessagesSection
