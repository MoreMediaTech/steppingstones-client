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
import HandleDeleteModal from '../HandleDeleteModal'
import DistrictSectionsTable from './DistrictSectionsTable'

const CountyTable = ({
  districtData,
  searchValue,
  type,
  setType,
  setOpen,
  setDistrict,
  setSearchValue,
  refetch,
}: {
  searchValue: string
  districtData: DistrictDataProps[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDistrict: React.Dispatch<React.SetStateAction<DistrictDataProps | null>>
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  refetch: () => void
  type: string
  setType: React.Dispatch<React.SetStateAction<'District' | 'DistrictSection'>>
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openLASectionModal, setOpenLASectionModal] = useState<boolean>(false)
  const [laData, setLAData] = useState<DistrictDataProps | null>(null)
  const [deleteDistrictById, { isLoading }] = useDeleteDistrictByIdMutation()

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
      <section className=" relative  overflow-auto shadow-md sm:rounded-lg md:w-full">
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
              value={searchValue}
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-80  "
              placeholder="Search for items"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <table className="relative table w-full overflow-auto overflow-x-auto text-center text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                district name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                county name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
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
                className="border-b bg-white hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
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
                  <div className="flex items-center justify-start space-x-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#5E17EB] p-1">
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
                  className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-900"
                >
                  <div className="flex items-center justify-start space-x-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#5E17EB] p-1">
                      <Image
                        src={district.county?.logoIcon ?? steppingstonesapplogo}
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
                  className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-900"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      disabled={false}
                      variant="outline"
                      className="text-xs font-medium text-blue-600 sm:text-base "
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
                  <div className="flex items-center justify-center rounded-lg bg-lime-400 text-xs text-white shadow-lg sm:text-sm">
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
                      className="text-xs font-medium  text-blue-600 sm:text-base"
                      onClick={() => {
                        setDistrict(district)
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
                      onClick={() => setOpenModal(true)}
                    >
                      Delete
                    </Button>
                    <HandleDeleteModal
                      open={openModal}
                      data={district}
                      deleteHandler={deleteHandler}
                      setOpenModal={setOpenModal}
                      isLoading={isLoading}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </>
  )
}

export default CountyTable
