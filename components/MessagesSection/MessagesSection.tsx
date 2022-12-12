import React, { useCallback, useState } from 'react'
import { Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import { useGetAllInAppEnquiryMsgQuery, useDeleteManyMailMutation } from 'features/messages/messagesApiSlice'
import MessagesTable from './MessagesTable'
import { MessageProps } from '@lib/types'


const MessagesSection = () => {
  const { data: messages, isLoading, refetch } = useGetAllInAppEnquiryMsgQuery()
  const [searchResults, setSearchResults] = useState<MessageProps[]>([])
  const [selectedMessageId, setSelectedMessageId] = useState<string[]>([])
  const [checked, setChecked] = useState<boolean>(false)
  const [deleteManyMail, { isLoading: isDeleting }] =
    useDeleteManyMailMutation()

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

  const handleDeleteMany = useCallback(async () => {
    try {
      const response = await deleteManyMail(selectedMessageId).unwrap()
      if (response.success) {
        showNotification({
          message: 'Successfully deleted Enquiries',
          color: 'success',
          autoClose: 3000,
        })
        refetch()
        setChecked(false)
        setSelectedMessageId([])
      }
    } catch (error) {
      showNotification({
        message: 'Error deleting Enquiries',
        color: 'error',
        autoClose: 3000,
      })
    }
  }, [checked, selectedMessageId])

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }
  return (
    <section className="w-full ">
      <MessagesTable
        messages={
          searchResults.length > 0
            ? searchResults
            : (messages as MessageProps[])
        }
        checked={checked}
        selectedMessageId={selectedMessageId}
        handleSearch={handleSearch}
        handleSelect={handleSelect}
        handleDeleteMany={handleDeleteMany}
      />
    </section>
  )
}

export default MessagesSection
