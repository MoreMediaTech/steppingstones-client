import React, { useState, useCallback } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { Button, Loader } from '@mantine/core'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Modal } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import { SubSectionProps } from '@lib/types'
import {
  useDeleteSubSectionByIdMutation,
  useGetSubSectionsBySectionIdQuery,
  useDeleteManySubSectionsMutation,
} from 'features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setSectionType, editorSelector } from 'features/editor/editorSlice'
import HandleDeleteModal from '../../HandleDeleteModal/HandleDeleteModal'
import UpdateSectionModal from './UpdateSectionModal'

const SubSectionsTable = ({
  sectionName,
  sectionId,
  openSubSectionModal,
  setOpenSubSectionModal,
  handleModalClose,
  refetch,
}: {
  sectionName: string
  sectionId: string
  openSubSectionModal: boolean
  setOpenSubSectionModal: React.Dispatch<React.SetStateAction<boolean>>
  handleModalClose: () => void
  refetch: () => void
}) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [subSection, setSubSection] = useState<SubSectionProps | null>(null)
  const [searchResults, setSearchResults] = useState<SubSectionProps[]>([])
  const [checked, setChecked] = useState<boolean>(false)
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([])

  const { sectionType } = useAppSelector(editorSelector)
  const {
    data: subSectionData,
    isLoading: isLoadingSubSections,
    refetch: refetchSubSection,
  } = useGetSubSectionsBySectionIdQuery(sectionId)

  const [deleteSubSectionById, { isLoading }] =
    useDeleteSubSectionByIdMutation()

  const [deleteManySubSections, { isLoading: isDeletingManySections }] =
    useDeleteManySubSectionsMutation()

  const handleUpdateModalClose = () => {
    setOpen(false)
    setSubSection(null)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(subSectionData as SubSectionProps[])

    const resultsArray = subSectionData?.filter((section: SubSectionProps) =>
      section?.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as SubSectionProps[])
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!e.target.checked) {
      setChecked(false)
      setSelectedSectionIds((sectionId) =>
        sectionId.filter((id) => id !== value)
      )
    } else {
      setChecked(true)
      setSelectedSectionIds((sectionId) => [...new Set([...sectionId, value])])
    }
  }

  const data = searchResults.length > 0 ? searchResults : subSectionData

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await deleteSubSectionById(id).unwrap()
      refetchSubSection()
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

  const handleDeleteMany = useCallback(async () => {
    try {
      const response = await deleteManySubSections(selectedSectionIds).unwrap()
      if (response.success) {
        showNotification({
          message: 'Successfully deleted Partner Directory entries',
          color: 'success',
          autoClose: 3000,
        })
        refetchSubSection()
        setChecked(false)
        setSelectedSectionIds([])
      }
    } catch (error) {
      showNotification({
        message: 'Error deleting Partner Directory Data',
        color: 'error',
        autoClose: 3000,
      })
    }
  }, [checked, selectedSectionIds])

  return (
    <>
      <Modal
        overlayColor="rgba(0, 0, 0, 0.5)"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="80%"
        opened={openSubSectionModal}
        onClose={handleModalClose}
        title={`${sectionName} LA Sections`}
        centered
      >
        {isLoadingSubSections ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className=" relative h-[500px] min-h-[500px] overflow-y-auto scroll-smooth sm:h-[700px] md:w-full">
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
                {selectedSectionIds.length > 0 && (
                  <button type="button" onClick={handleDeleteMany}>
                    <FaTrash fontSize={20} className="text-red-500" />
                  </button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="relative table w-full  text-center text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Section name
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      live
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      sub section
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Updated At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subSectionData?.map((section: SubSectionProps) => (
                    <tr
                      key={section.id}
                      className="border-b bg-white hover:bg-gray-50"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                            value={section.id}
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
                        <div className="flex items-center justify-start space-x-2">
                          <div className="text-xs font-semibold sm:text-base ">
                            <p>{section?.name}</p>
                          </div>
                        </div>
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
                      <td className="px-6 py-4 text-center ">
                        <div className="flex items-center justify-center">
                          {section?.isSubSubSection ? (
                            <FaCheck className="text-green-400" />
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-2 py-1 text-center">
                        <div className="flex items-center justify-center rounded-lg bg-lime-400 text-xs text-white shadow-lg sm:text-sm">
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
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            type="button"
                            disabled={false}
                            variant="outline"
                            leftIcon={<FaEdit fontSize={14} />}
                            className="text-xs font-medium  text-blue-600 sm:text-base"
                            onClick={() => {
                              setSubSection(section)
                              setOpen(true)
                              dispatch(setSectionType('SubSection'))
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
                              setSubSection(section)
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
        )}
      </Modal>
      {open && (
        <UpdateSectionModal
          key={subSection?.id}
          open={open}
          handleModalClose={handleUpdateModalClose}
          refetch={refetchSubSection}
          data={subSection as SubSectionProps}
          type={sectionType}
        />
      )}
      {openModal && (
        <HandleDeleteModal
          open={openModal}
          data={subSection as SubSectionProps}
          deleteHandler={deleteHandler}
          setOpenModal={setOpenModal}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default SubSectionsTable
