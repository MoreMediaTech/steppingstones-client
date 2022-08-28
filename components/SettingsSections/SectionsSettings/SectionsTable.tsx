import React, { useState, useCallback } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { Button } from '@mantine/core'
import Image from 'next/image'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { showNotification } from '@mantine/notifications'

import steppingstonesapplogo from '../../../public/steppingstonesapplogo.png'
import { SectionProps } from '@lib/types'
import { useDeleteSectionByIdMutation } from 'features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setSectionType } from 'features/editor/editorSlice'
import HandleDeleteModal from '../../HandleDeleteModal/HandleDeleteModal'
import SubSectionsTable from './SubSectionsTable'

interface ISectionsTableProps {
  type: 'Section' | 'SubSection'
  sectionsData: SectionProps[]
  checked: boolean
  selectedSectionIds: string[]
  setType: React.Dispatch<React.SetStateAction<'Section' | 'SubSection'>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSection: React.Dispatch<React.SetStateAction<SectionProps | null>>
  refetch: () => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteMany: () => void
}

const SectionsTable = ({
  sectionsData,
  type,
  setType,
  setOpen,
  setSection,
  checked,
  refetch,
  handleSearch,
  handleSelect,
  handleDeleteMany,
  selectedSectionIds,
}: ISectionsTableProps) => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [sectionData, setSectionData] = useState<SectionProps | null>(null)
  const [openSubSectionModal, setOpenSubSectionModal] = useState<boolean>(false)
  const [deleteSectionById, { isLoading }] = useDeleteSectionByIdMutation()

  const handleModalClose = () => {
    setOpenSubSectionModal(false)
    setSectionData(null)
  }

  const deleteHandler = useCallback(async (id: string, type?: string) => {
    try {
      const response  = await deleteSectionById(id).unwrap()
      refetch()
      setOpenModal(false)
      showNotification({
        message: response.message  ?? 'Section deleted successfully',
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
      <section className=" relative space-y-2 bg-primary-light-50 px-2 shadow-md dark:bg-primary-dark-600 sm:rounded-lg ">
        <div className="flex items-center gap-2 p-4">
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
          <div className="mt-2">
            {checked && selectedSectionIds.length > 0 && (
              <button type="button" onClick={handleDeleteMany}>
                <FaTrash fontSize={20} className="text-red-500" />
              </button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full bg-primary-light-50 text-left text-gray-500 dark:bg-primary-dark-600 dark:text-primary-light-100">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-primary-dark-500 dark:text-primary-light-200">
              <tr>
                <th scope="col" className="p-4"></th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-3 text-left"
                >
                  section name
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-3 text-left"
                >
                  county name
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Sub-Sections
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  live
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Updated At
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sectionsData?.map((section: SectionProps) => (
                <tr
                  key={section.id}
                  className="group border-b hover:bg-gray-100 dark:hover:bg-primary-light-500"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        value={section.id}
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
                    className="whitespace-nowrap px-6 py-4 text-left font-medium "
                  >
                    <div className="flex items-center justify-start text-xl font-semibold">
                      <p>{section?.name}</p>
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-left font-medium "
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <div className="relative h-10 w-10 rounded-full border p-1">
                        <Image
                          src={
                            section?.county?.logoIcon ?? steppingstonesapplogo
                          }
                          alt={section?.county?.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="text-xl font-semibold">
                        <p>{section.county?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-left font-medium "
                  >
                    {section.isSubSection && (
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          disabled={false}
                          variant="outline"
                          className="text-xs font-medium text-blue-600 hover:bg-blue-600 hover:text-white group-hover:bg-blue-600 group-hover:text-white sm:text-base "
                          onClick={() => {
                            setOpenSubSectionModal(true)
                            setSectionData(section)
                            setType('SubSection')
                          }}
                        >
                          View
                        </Button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center ">
                    <div className="flex items-center justify-center">
                      {section?.isLive ? (
                        <FaCheck className="text-green-400" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 text-center">
                    <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 text-lg text-white shadow-lg">
                      <p>
                        {format(
                          new Date(section?.updatedAt as string),
                          'MM/dd/yyyy HH:mm:ss',
                          {
                            locale: enGB,
                          }
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        disabled={false}
                        variant="outline"
                        leftIcon={<FaEdit fontSize={14} />}
                        className="font-medium text-blue-600 hover:bg-blue-600 hover:text-white group-hover:bg-blue-600 group-hover:text-white"
                        onClick={() => {
                          setSection(section)
                          setOpen(true)
                          dispatch(setSectionType('Section'))
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
                        onClick={() => {
                          setOpenModal(true)
                          setSectionData(section)
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
      {openSubSectionModal && (
        <SubSectionsTable
          sectionId={sectionData?.id as string}
          openSubSectionModal={openSubSectionModal}
          setOpenSubSectionModal={setOpenSubSectionModal}
          handleModalClose={handleModalClose}
          refetch={refetch}
          sectionName={sectionData?.name as string}
        />
      )}
      {openModal && (
        <HandleDeleteModal
          open={openModal}
          data={sectionData}
          deleteHandler={deleteHandler}
          setOpenModal={setOpenModal}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default SectionsTable
