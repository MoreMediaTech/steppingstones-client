import React from 'react'
import { useRouter } from 'next/router'
import { MessageProps } from '@lib/types'
import { FaTrash } from 'react-icons/fa'
import { IoCreateSharp } from 'react-icons/io5'

// component
import CreateMessage from './CreateMessage'

// redux
import { useUpdateMsgStatusByIdMutation } from 'features/messages/messagesApiSlice'

interface IMessagesTableProps {
  messages: MessageProps[]
  checked: boolean
  selectedMessageId: string[]
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteMany: () => void
}

const MessagesTable = ({
  messages,
  checked,
  selectedMessageId,
  handleSearch,
  handleSelect,
  handleDeleteMany,
}: IMessagesTableProps) => {
  const router = useRouter()
  const [updateMsgStatusById] = useUpdateMsgStatusByIdMutation()
  const [opened, setOpened] = React.useState<boolean>(false)

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
  return (
    <>
    <section className=" relative  w-full h-full  shadow-md sm:rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-2 py-2 md:py-4">
        <div className="relative mt-1">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-500 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-full md:w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
            placeholder="Search for items"
            onChange={handleSearch}
          />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button type="button" onClick={handleDeleteMany}>
            <FaTrash
              fontSize={30}
              className={
                selectedMessageId.length > 0 ? 'text-red-500' : 'text-gray-400'
              }
            />
          </button>
          <button type="button" onClick={() => setOpened(o => !o)}>
              <IoCreateSharp fontSize={34} className="text-gray-400"/>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="relative w-full overflow-x-auto text-center text-sm text-gray-500 ">
          <tbody>
            {messages?.map((message: MessageProps) => (
              <tr
                key={message.id}
                className="border-b bg-white hover:cursor-pointer hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      value={message?.id}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                      onChange={handleSelect}
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-900"
                >
                  <div
                    onClick={() => {
                      router.push(`/admin/editor-portal/messages/${message.id}`)
                      handleUpdateIsRead(message)
                    }}
                  >
                    <p
                      className={`${
                        message.isRead ? 'text-gray-500' : 'text-gray-700'
                      }`}
                    >
                      {message?.from}
                    </p>
                    <p
                      className={`${
                        message.isRead
                          ? 'font-medium text-gray-400'
                          : 'font-semibold text-gray-900'
                      }text-left text-base md:text-lg`}
                    >
                      {message?.subject}
                    </p>
                    <p
                      className={`${
                        message.isRead ? 'text-gray-500' : 'text-gray-700'
                      } whitespace-wrap text-ellipsis text-left text-xs md:text-sm`}
                    >
                      {message?.message}
                    </p>
                  </div>
                </td>
                <td className="mt-4 hidden  px-6 py-4 md:flex">
                  <div className="flex flex-grow items-center justify-center">
                    {new Date(message?.createdAt as string).toUTCString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    <CreateMessage opened={opened} setOpened={setOpened} />
    </>
  )
}

export default MessagesTable
