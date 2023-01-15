import React, { useState, useCallback } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { Button, Loader } from '@mantine/core'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Modal } from '@mantine/core'

import { DistrictSectionProps } from '@lib/types'
import {
  useDeleteDistrictSectionByIdMutation,
  useGetDistrictSectionsByDistrictIdQuery,
} from 'features/editor/editorApiSlice'
import { showNotification } from '@mantine/notifications'
import HandleDeleteModal from '../../HandleDeleteModal/HandleDeleteModal'
import UpdateDistrictModal from './UpdateDistrictModal'
import { useAppSelector, useAppDispatch } from '../../../state/hooks'
import {
  editorSelector,
  setDistrictSection,
} from '../../../features/editor/editorSlice'

const DistrictSectionsTable = ({
  type,
  setType,
  laName,
  laSectionId,
  openLASectionModal,
  setOpenLASectionModal,
  handleModalClose,
  refetch,
}: {
  laName: string
  type: string
  laSectionId: string
  openLASectionModal: boolean
  setOpenLASectionModal: React.Dispatch<React.SetStateAction<boolean>>
  setType: React.Dispatch<React.SetStateAction<'District' | 'DistrictSection'>>
  handleModalClose: () => void
  refetch: () => void
}) => {
  const districtId = laSectionId
  const {
    data: districtSectionData,
    isLoading: isLoadingDistrictSections,
    isError: isErrorDistrictSections,
  } = useGetDistrictSectionsByDistrictIdQuery(districtId)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [laSection, setLASection] = useState<DistrictSectionProps | null>(null)
  const [searchResults, setSearchResults] = useState<DistrictSectionProps[]>([])
  const { districtSection } = useAppSelector(editorSelector)

  const [deleteDistrictSectionById, { isLoading }] =
    useDeleteDistrictSectionByIdMutation()

  const handleUpdateModalClose = () => {
    setOpen(false)
    dispatch(setDistrictSection(null))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value)
      setSearchResults(districtSectionData as DistrictSectionProps[])

    const resultsArray = districtSectionData?.filter(
      (laSection: DistrictSectionProps) =>
        laSection?.name?.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as DistrictSectionProps[])
  }

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await deleteDistrictSectionById(id).unwrap()
      refetch()
      setOpenModal(false)
      dispatch(setDistrictSection(null))
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
  const data = searchResults.length > 0 ? searchResults : districtSectionData

  return (
    <>
      <Modal
        overlayColor="rgba(0, 0, 0, 0.5)"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="80%"
        opened={openLASectionModal}
        onClose={handleModalClose}
        title={`${laName} LA Sections`}
        centered
      >
        {isLoadingDistrictSections ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className=" relative  overflow-auto  md:w-full">
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
            <table className="relative table w-full overflow-auto overflow-x-auto text-center text-sm text-gray-500">
              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    LA Section name
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
                {data?.map((section: DistrictSectionProps) => (
                  <tr
                    key={section.id}
                    className="border-b bg-white hover:bg-gray-50"
                  >
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

                    <td className="px-2 py-1 text-center">
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
                            dispatch(setDistrictSection(section))
                            setOpen(true)
                            setType('DistrictSection')
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
                            dispatch(setDistrictSection(section))
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
          </section>
        )}
      </Modal>
      <UpdateDistrictModal
        key={laSection?.id}
        open={open}
        handleModalClose={handleUpdateModalClose}
        refetch={refetch}
        data={districtSection as DistrictSectionProps}
        type={type}
      />
      {openModal && (
        <HandleDeleteModal
          open={openModal}
          data={districtSection}
          deleteHandler={deleteHandler}
          setOpenModal={setOpenModal}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default DistrictSectionsTable
