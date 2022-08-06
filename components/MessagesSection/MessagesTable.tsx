import { useState } from 'react'
import { MessageProps } from '@lib/types'

interface IMessagesTableProps {
  messages: MessageProps[]
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MessagesTable = ({ messages, handleSearch, handleSelect }: IMessagesTableProps) => {

  return (
    <section className=" relative  w-full  shadow-md sm:rounded-lg">
      <div className="p-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
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
            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
            placeholder="Search for items"
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="relative w-full overflow-x-auto text-center text-sm text-gray-500 ">
        <tbody>
          {messages?.map((message: MessageProps) => (
            <tr key={message.id} className="border-b bg-white hover:bg-gray-50">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    value={message?.id}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                    onChange={handleSelect}
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td
                scope="row"
                className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-900"
              >
                <div>{message?.from}</div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-left text-base font-semibold text-gray-900 md:text-lg">
                    {message?.subject}
                  </p>
                  <p className="whitespace-no-wrop text-left text-xs md:text-sm">
                    {message?.message}
                  </p>
                </div>
              </td>
              <td className="hidden px-6 py-4 md:block">
                <div className="flex items-end">
                  {new Date(message?.createdAt).toUTCString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default MessagesTable
