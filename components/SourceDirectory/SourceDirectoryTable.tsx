import React, { useCallback, useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { Button } from '@mantine/core'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import HandleDeleteModal from '@components/HandleDeleteModal'
import { SourceDataProps } from '@lib/types'
import { useDeleteSDDataMutation } from 'features/editor/editorApiSlice'
import { useAppDispatch } from 'app/hooks'
import { setSDData } from 'features/editor/editorSlice'

interface ISourceDirectoryTableProps {
  data: SourceDataProps[]
  action: 'CREATE' | 'UPDATE'
  setAction: React.Dispatch<React.SetStateAction<'CREATE' | 'UPDATE'>>
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SourceDirectoryTable = ({
  data,
  action,
  setAction,
  refetch,
  handleSearch,
  handleSelected,
  setOpenUpdateModal,
}: ISourceDirectoryTableProps) => {
  const dispatch = useAppDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [deleteSDData, { isLoading }] = useDeleteSDDataMutation()

  const deleteHandler = useCallback(async (id: string, type?: string) => {
    const newData = {
      id,
      type,
    }
    try {
      const response = await deleteSDData(newData).unwrap()
      refetch()
      setOpenDeleteModal(false)
      showNotification({
        message: response.message ?? 'Section deleted successfully',
        color: 'green',
        autoClose: 3000,
      })
    } catch (error) {
      showNotification({
        message: 'Error deleting section',
        color: 'red',
        autoClose: 3000,
      })
    }
  }, [])
  return (
    <section className="relative my-8 bg-white px-2  md:w-full">
      <div className="p-4 ">
        <label htmlFor="table-search" className="sr-only" />
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
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 w-full md:w-80  "
            placeholder="Search by description or category"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="table w-full  text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Web-Link
              </th>
              <th scope="col" className="px-6 py-3">
                category
              </th>
              <th scope="col" className="whitespace-nowrap text-center px-6 py-3">
                Email Alerts
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit/Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {data?.map((item: SourceDataProps) => (
              <tr key={item.id} className="border-b bg-white hover:bg-gray-50">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      value={item?.id}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                      onChange={handleSelected}
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
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <div className="flex items-center justify-start space-x-2">
                    <p>{item?.description}</p>
                  </div>
                </td>

                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <a
                    href={item?.webLink}
                    rel="noreferrer"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {item?.webLink}
                  </a>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <p>{item?.category}</p>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900"
                >
                  <div className="items-cent flex justify-center">
                    <span>
                      {item?.canEmail ? (
                        <FaCheck fontSize={20} color="green" />
                      ) : (
                        <FaTimes fontSize={20} color="red" />
                      )}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      disabled={false}
                      variant="outline"
                      leftIcon={<FaEdit fontSize={14} />}
                      className="font-medium text-blue-600  "
                      onClick={() => {
                        dispatch(setSDData(item))
                        setOpenUpdateModal(true)
                        setAction('UPDATE')
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      disabled={false}
                      variant="outline"
                      color="red"
                      leftIcon={<FaTrash fontSize={14} />}
                      className="font-medium  hover:bg-red-500 hover:text-white "
                      onClick={() => setOpenDeleteModal(true)}
                    >
                      Delete
                    </Button>
                    <HandleDeleteModal
                      open={openDeleteModal}
                      data={item}
                      deleteHandler={deleteHandler}
                      setOpenModal={setOpenDeleteModal}
                      isLoading={isLoading}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default SourceDirectoryTable
