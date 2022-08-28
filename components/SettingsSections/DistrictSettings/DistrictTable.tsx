import React, { useState, useCallback } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { Button } from '@mantine/core'
import Image from 'next/image'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import steppingstonesapplogo from '../../../public/steppingstonesapplogo.png'
import { DistrictDataProps } from '@lib/types'
import { useDeleteDistrictByIdMutation } from 'features/editor/editorApiSlice'
import { showNotification } from '@mantine/notifications'
import HandleDeleteModal from '../../HandleDeleteModal/HandleDeleteModal'
import DistrictSectionsTable from './DistrictSectionsTable'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { editorSelector, setDistrict } from '../../../features/editor/editorSlice'

interface IDistrictTableProps {
  type: string
  districtData: DistrictDataProps[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  setType: React.Dispatch<React.SetStateAction<'District' | 'DistrictSection'>>
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CountyTable = ({
  districtData,
  type,
  setType,
  setOpen,
  refetch,
  handleSearch,
}: IDistrictTableProps) => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openLASectionModal, setOpenLASectionModal] = useState<boolean>(false)
  const [laData, setLAData] = useState<DistrictDataProps | null>(null)
  const [deleteDistrictById, { isLoading }] = useDeleteDistrictByIdMutation()
  const { district: selectedDistrictData } = useAppSelector(editorSelector)

  const handleModalClose = () => {
    setOpenLASectionModal(false)
    setLAData(null)
  }

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await deleteDistrictById(id).unwrap()
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
      <section className=" relative space-y-2 bg-primary-light-50 px-2 shadow-md dark:bg-primary-dark-600 sm:rounded-lg">
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
        <div className="overflow-x-auto">
          <table className="relative table w-full bg-primary-light-50 text-left text-gray-500 dark:bg-primary-dark-600 dark:text-primary-light-100">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-primary-dark-500 dark:text-primary-light-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  LA name
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  county name
                </th>
                <th scope="col" className="px-6 py-3 ">
                  LA Sections
                </th>
                <th scope="col" className="px-6 py-3">
                  live
                </th>

                <th scope="col" className="px-6 py-3">
                  Updated At
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-auto">
              {districtData?.map((district: DistrictDataProps) => (
                <tr
                  key={district.id}
                  className="border-b  hover:bg-gray-100 dark:hover:bg-primary-light-500"
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-left font-medium "
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary-dark-200 p-1">
                        <Image
                          src={district.logoIcon ?? steppingstonesapplogo}
                          alt={district.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="text-xs font-semibold sm:text-base ">
                        <p>{district?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-left font-medium "
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#5E17EB] p-1">
                        <Image
                          src={
                            district.county?.logoIcon ?? steppingstonesapplogo
                          }
                          alt={district.county?.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="text-xs font-semibold sm:text-base">
                        <p>{district.county?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-left font-medium "
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        disabled={false}
                        variant="outline"
                        className="text-xs font-medium text-blue-600 hover:bg-blue-600 hover:text-white sm:text-base "
                        onClick={() => {
                          setOpenLASectionModal(true)
                          setLAData(district)
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center ">
                    <div className="flex items-center justify-center">
                      {district?.isLive ? (
                        <FaCheck className="text-green-400" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </div>
                  </td>

                  <td className="px-2 py-1 text-center">
                    <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 text-xs text-white shadow-lg sm:text-sm">
                      <p>
                        {format(
                          new Date(district?.updatedAt as string),
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
                        className="text-xs font-medium  text-blue-600 sm:text-base hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          dispatch(setDistrict(district))
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
                        className="text-xs  font-medium hover:bg-red-500 hover:text-white sm:text-base"
                        onClick={() => {
                          setOpenModal(true)
                          dispatch(setDistrict(district))
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
      {openLASectionModal && (
        <DistrictSectionsTable
          laSectionId={laData?.id as string}
          openLASectionModal={openLASectionModal}
          setOpenLASectionModal={setOpenLASectionModal}
          handleModalClose={handleModalClose}
          refetch={refetch}
          laName={laData?.name as string}
          type={type}
          setType={setType}
        />
      )}
      {openModal && (
        <HandleDeleteModal
          open={openModal}
          data={selectedDistrictData}
          deleteHandler={deleteHandler}
          setOpenModal={setOpenModal}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default CountyTable
