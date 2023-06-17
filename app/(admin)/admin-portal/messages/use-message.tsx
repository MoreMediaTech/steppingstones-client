'use client'
import React from 'react'
import { MessageProps } from '@lib/types'
import { useUpdateMsgStatusByIdMutation } from 'app/global-state/features/messages/messagesApiSlice'

export default function useMessage() {
  const [updateMsgStatusById] = useUpdateMsgStatusByIdMutation()

  const handleUpdateIsRead = React.useCallback(
    async (message: MessageProps) => {
      try {
        if (!message.isRead) {
          await updateMsgStatusById({
            id: message?.id as string,
            isRead: true,
            isArchived: false,
          }).unwrap()
        }
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  return {
    handleUpdateIsRead,
  }
}
