import React, { useCallback, useState } from 'react'
import HandleDeleteModal from '@components/HandleDeleteModal'
import { showNotification } from '@mantine/notifications'
import { PartnerData } from '@lib/types'
import { useDeletePartnerDataMutation } from 'features/partner/partnerApiSlice'
import { Button } from '@mantine/core'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useAppDispatch } from 'app/hooks'
import { setPartnerData, setType } from 'features/partner/partnerSlice'

interface PartnerDirectoryTableProps {
  partnerData: PartnerData[]
  checked: boolean
  selectedPartnersId: string[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteMany: () => void
}

const PartnerDirectoryTable = ({
  partnerData,
  checked,
  selectedPartnersId,
  setOpen,
  refetch,
  handleSearch,
  handleSelected,
  handleDeleteMany,
}: PartnerDirectoryTableProps) => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [deletePartnerData, { isLoading }] = useDeletePartnerDataMutation()

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await deletePartnerData(id).unwrap()
      refetch()
      setOpenModal(false)
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
    <section className="relative space-y-2 bg-primary-light-50 px-2 shadow-md dark:bg-primary-dark-600 sm:rounded-lg md:px-4">
      <div className="flex items-center gap-6 p-4">
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
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-80  "
            placeholder="Search for items"
            onChange={handleSearch}
          />
        </div>
        <div className="mt-2">
          {checked && selectedPartnersId.length > 0 && (
            <button type="button" onClick={handleDeleteMany}>
              <FaTrash fontSize={20} className="text-red-500" />
            </button>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto md:p-4">
        <table className="table bg-primary-light-50 text-left text-gray-500 dark:bg-primary-dark-600 dark:text-primary-light-100">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-primary-dark-500 dark:text-primary-light-200">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3 text-left">
                Organisation
              </th>
              <th scope="col" className="px-6 py-3">
                Project
              </th>
              <th scope="col" className="px-6 py-3">
                Closing Date
              </th>
              <th scope="col" className="px-6 py-3">
                full name
              </th>
              <th scope="col" className="px-6 py-3">
                position
              </th>
              <th scope="col" className="px-6 py-3">
                email address
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {partnerData?.map((partner: PartnerData) => (
              <tr
                key={partner.id}
                className="group border-b hover:bg-gray-100  dark:hover:bg-primary-light-500"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      value={partner?.id}
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
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium"
                >
                  <div className="flex items-center justify-start space-x-2">
                    <p>{partner?.organisation?.name}</p>
                  </div>
                </td>

                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium"
                >
                  <p>{partner?.projectsResponsibleFor}</p>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium"
                >
                  <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 px-1 text-lg text-white shadow-lg">
                    <p>
                      {format(
                        new Date(partner?.closingDate),
                        'MM/dd/yyyy HH:mm:ss',
                        {
                          locale: enGB,
                        }
                      )}
                    </p>
                  </div>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium"
                >
                  <p>{partner?.partner?.name}</p>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium"
                >
                  <p>{partner?.position}</p>
                </td>
                <td
                  scope="row"
                  className="text-wrap overflow-hidden truncate whitespace-nowrap px-6 py-4 text-left text-sm font-medium hover:underline dark:text-primary-light-300 dark:group-hover:text-primary-dark-100"
                >
                  <a href={`mailto:${partner?.partner?.email}`}>
                    {partner?.partner?.email}
                  </a>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      disabled={false}
                      variant="outline"
                      leftIcon={<FaEdit fontSize={14} />}
                      className="font-medium text-blue-600 hover:bg-blue-600 hover:text-white group-hover:bg-blue-600 group-hover:text-white "
                      onClick={() => {
                        dispatch(setPartnerData(partner))
                        dispatch(setType('Update'))
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
                      onClick={() => setOpenModal(true)}
                    >
                      Delete
                    </Button>
                    <HandleDeleteModal
                      open={openModal}
                      data={partner}
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
      </div>
    </section>
  )
}

export default PartnerDirectoryTable
