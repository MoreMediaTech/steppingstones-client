import React, { useState, useCallback, useEffect } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { Button } from '@mantine/core'
import Image from 'next/image'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import steppingstonesapplogo from '../../../public/steppingstonesapplogo.png'
import { CountyDataProps } from '@lib/types'
import { useRemoveCountyMutation } from 'features/editor/editorApiSlice'
import { showNotification } from '@mantine/notifications'
import HandleDeleteModal from '../../HandleDeleteModal/HandleDeleteModal'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { editorSelector, setCounty } from 'features/editor/editorSlice'

function getWindowSize() {
  const { innerWidth, innerHeight } = window
  return { innerWidth, innerHeight }
}

interface CountyTableProps {
  countyData: CountyDataProps[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CountyTable = ({
  countyData,
  setOpen,
  refetch,
  handleSearch,
}: CountyTableProps) => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [windowSize, setWindowSize] = useState(getWindowSize())

  const [removeCounty, { isLoading }] = useRemoveCountyMutation()
  const { county } = useAppSelector(editorSelector)

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await removeCounty(id).unwrap()
      refetch()
      setOpenModal(false)
      showNotification({
        message: 'Section deleted successfully',
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
    <>
      <section
        className={`relative space-y-2 bg-primary-light-50 px-2 shadow-md dark:bg-primary-dark-600 sm:rounded-lg`}
      >
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
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-80  "
              placeholder="Search for items"
              onChange={handleSearch}
            />
          </div>
        </div>
        <div
          className="relative w-full overflow-auto py-2"
          style={{
            height: windowSize.innerHeight - 200,
            scrollbarWidth: 'none',
          }}
        >
          <table
            className={`table w-full bg-primary-light-50 text-left text-gray-500 dark:bg-primary-dark-600 dark:text-primary-light-100`}
          >
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-primary-dark-500 dark:text-primary-light-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  county name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  published
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Updated At
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className={`relative overflow-auto`}>
              {countyData?.map((county: CountyDataProps) => (
                <tr
                  key={county.id}
                  className="group border-b hover:bg-gray-100 dark:hover:bg-primary-light-500"
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-left font-medium "
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <div className="relative h-10 w-10 rounded-full border p-1">
                        <Image
                          src={county.logoIcon ?? steppingstonesapplogo}
                          alt={county.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="text-xl font-semibold">
                        <p>{county?.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center ">
                    <div className="flex items-center justify-center">
                      {county?.published ? (
                        <FaCheck className="text-green-400" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 text-lg text-white shadow-lg">
                      <p>
                        {format(
                          new Date(county.updatedAt),
                          'MM/dd/yyyy HH:mm:ss',
                          {
                            locale: enGB,
                          }
                        )}
                      </p>
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
                          dispatch(setCounty(county))
                          setOpen(true)
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
                        className="font-medium  hover:bg-red-500 group-hover:bg-red-500 hover:text-white group-hover:text-white"
                        onClick={() => {
                          setOpenModal(true)
                          dispatch(setCounty(county))
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {openModal && (
        <HandleDeleteModal
          open={openModal}
          data={county}
          deleteHandler={deleteHandler}
          setOpenModal={setOpenModal}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default CountyTable
