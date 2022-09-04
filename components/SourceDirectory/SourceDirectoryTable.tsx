import React, { MouseEventHandler, useCallback, useState, useRef, HTMLProps, ReactInstance } from 'react'
import { showNotification } from '@mantine/notifications'
import { Button } from '@mantine/core'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { BsPrinterFill } from 'react-icons/bs'
import { BiChevronDownSquare, BiChevronUpSquare } from 'react-icons/bi'

import HandleDeleteModal from '@components/HandleDeleteModal'
import { SourceDataProps } from '@lib/types'
import { useDeleteSDDataMutation } from 'features/editor/editorApiSlice'
import { useAppDispatch } from 'app/hooks'
import { setSDData } from 'features/editor/editorSlice'

interface ISourceDirectoryTableProps {
  data: SourceDataProps[]
  action: 'CREATE' | 'UPDATE'
  checked: boolean
  selectedSDId: string[]
  setAction: React.Dispatch<React.SetStateAction<'CREATE' | 'UPDATE'>>
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteMany: () => void
}


type SortKeys = keyof SourceDataProps

type SortOrder = 'asc' | 'desc'

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: SourceDataProps[]
  sortKey: SortKeys
  reverse: boolean
}) {
  if (!sortKey) return tableData

  const sortedData = [...tableData].sort((a, b) => {
    return a[sortKey]! > b[sortKey]! ? 1 : -1
  })

  if (reverse) {
    return sortedData.reverse()
  }

  return tableData
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder
  columnKey: SortKeys
  sortKey: SortKeys
  onClick: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button type="button" onClick={onClick}>
      {sortKey === columnKey && sortOrder === 'desc' ? (
        <BiChevronDownSquare fontSize={15} />
      ) : (
        <BiChevronUpSquare fontSize={15} />
      )}
    </button>
  )
}

const SourceDirectoryTable = ({
  data,
  action,
  checked,
  selectedSDId,
  setAction,
  refetch,
  handleSearch,
  handleSelected,
  setOpenUpdateModal,
  handleDeleteMany,
}: ISourceDirectoryTableProps) => {
  const dispatch = useAppDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [sortKey, setSortKey] = useState<SortKeys>('description')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [deleteSDData, { isLoading }] = useDeleteSDDataMutation()
  const printableArea = useRef<HTMLDivElement>(null)
  const print = useCallback(() => {
    if (printableArea.current) {
      const printWindow = window.open('', 'PRINT', 'height=800,width=800')
      printWindow?.document.write(printableArea.current.innerHTML)
      printWindow?.document.close()
      printWindow?.focus()
      printWindow?.print()
      printWindow?.close()
    }
  }, [printableArea])

  const headers: { key: SortKeys; label: string }[] = [
    { key: 'description', label: 'description' },
    { key: 'webLink', label: 'Web-Link' },
    { key: 'category', label: 'category' },
    { key: 'canEmail', label: 'email alerts' },
  ]

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: data,
        sortKey,
        reverse: sortOrder === 'desc',
      }),
    [data, sortKey, sortOrder]
  )

  function changeSort(key: SortKeys) {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

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
    <section className="relative my-2 bg-primary-light-50 px-2 dark:bg-primary-dark-600 dark:text-primary-light-100  md:w-full">
      <div className="my-2 flex items-center gap-2 py-2">
        <div className="relative mt-1 w-full">
          <label htmlFor="table-search" className="sr-only" />
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-80  "
            placeholder="Search by description or category"
            onChange={handleSearch}
          />
        </div>
        <div className="mt-3">
          {checked && selectedSDId.length > 0 && (
            <button type="button" onClick={handleDeleteMany}>
              <FaTrash fontSize={30} className="text-red-500" />
            </button>
          )}
        </div>
        <div className="mt-3">
          <button type="button" onClick={print}>
            <BsPrinterFill fontSize={40} className="text-tertiary" />
          </button>
        </div>
      </div>
      <div
        ref={printableArea}
        className={`relative overflow-x-auto`}
        style={{ height: window.innerHeight - 500 }}
      >
        <table className="table w-full bg-primary-light-50 text-left text-gray-500  dark:bg-primary-dark-600 dark:text-primary-light-100">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-primary-dark-500 dark:text-primary-light-200">
            <tr>
              <th scope="col" className="p-4"></th>
              {headers.map((header) => {
                if (header.key === 'canEmail') {
                  return (
                    <th
                      key={header.key}
                      className="whitespace-nowrap px-6 py-3"
                    >
                      <div className="flex flex-row items-center justify-center gap-1">
                        <span>{header.label}</span>{' '}
                        <SortButton
                          {...{ sortOrder, sortKey }}
                          columnKey={header.key}
                          onClick={() => changeSort(header.key)}
                        />
                      </div>
                    </th>
                  )
                } else {
                  return (
                    <th
                      key={header.key}
                      className="whitespace-nowrap px-6 py-3"
                    >
                      <div className="flex flex-row justify-start gap-1 text-left">
                        <span>{header.label}</span>{' '}
                        <SortButton
                          {...{ sortOrder, sortKey }}
                          columnKey={header.key}
                          onClick={() => changeSort(header.key)}
                        />
                      </div>
                    </th>
                  )
                }
              })}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit/Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className={`overflow-auto`}>
            {sortedData().map((item: SourceDataProps) => (
              <tr
                key={item.id}
                className="group group border-b hover:bg-gray-100 dark:hover:bg-primary-light-500"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      value={item.id}
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
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium "
                >
                  <div className="flex items-center justify-start space-x-2">
                    <p>{item?.description}</p>
                  </div>
                </td>

                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium "
                >
                  <a
                    href={item?.webLink}
                    rel="noreferrer"
                    target="_blank"
                    className="text-primary-dark-100 hover:underline dark:text-primary-light-300 dark:group-hover:text-primary-dark-100"
                  >
                    {item?.webLink}
                  </a>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium "
                >
                  <p>{item?.category}</p>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium "
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
                      className="font-medium text-blue-600 hover:bg-blue-600 hover:text-white group-hover:bg-blue-600 group-hover:text-white"
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
                      className="font-medium  hover:bg-red-500 hover:text-white group-hover:bg-red-500 group-hover:text-white"
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
