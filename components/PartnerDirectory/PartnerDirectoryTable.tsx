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

const PartnerDirectoryTable = ({
  partnerData,
  setOpen,
  searchValue,
  setSearchValue,
  refetch,
  handleSearch,
  handleSelected
}: {
  searchValue: string
  partnerData: PartnerData[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  refetch: () => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
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
    <section className=" container relative mx-auto  my-8   bg-white px-2 shadow-md sm:rounded-lg md:w-full">
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
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-80  "
            placeholder="Search for items"
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
                Organisation
              </th>
              <th scope="col" className="px-6 py-3">
                value category
              </th>
              <th scope="col" className="px-6 py-3">
                partner type
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
          <tbody className="overflow-auto">
            {partnerData?.map((partner: PartnerData) => (
              <tr
                key={partner.id}
                className="border-b bg-white hover:bg-gray-50"
                onClick={() => {
                  dispatch(setPartnerData(partner))
                  dispatch(setType('Update'))
                  setOpen(true)
                }}
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
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <div className="flex items-center justify-start space-x-2">
                    <p>{partner?.organisation?.name}</p>
                  </div>
                </td>

                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <p>{partner?.valueCategory}</p>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <p>{partner?.partnerType}</p>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <p>{partner?.partner?.name}</p>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <p>{partner?.position}</p>
                </td>
                <td
                  scope="row"
                  className="text-wrap overflow-hidden truncate whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900"
                >
                  <p>{partner?.partner?.email}</p>
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
                      className="font-medium  hover:bg-red-500 hover:text-white "
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
