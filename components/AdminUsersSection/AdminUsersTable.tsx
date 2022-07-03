import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { CurrentUser } from '@lib/types'
import { Button } from '@mantine/core'
import UpdateAdminUserModal from './UpdateAdminUserModal'

const AdminUsersTable = ({
  users,
  open,
  setOpen,
  setUser,
  refetch,
}: {
  users: CurrentUser[]
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
  refetch: () => void
}) => {
  return (
    <>
      <section className="container relative mx-auto w-full max-w-screen-xl shadow-md sm:rounded-lg">
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
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="relative w-full overflow-x-auto text-center text-sm text-gray-500 ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
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
                name
              </th>
              <th scope="col" className="px-6 py-3">
                Organisation
              </th>
              <th scope="col" className="px-6 py-3">
                County
              </th>
              <th scope="col" className="px-6 py-3">
                Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Accept T&C
              </th>
              <th scope="col" className="px-6 py-3">
                Email Verified
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: CurrentUser) => (
              <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
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
                  {user?.name}
                </td>
                <td className="px-6 py-4">{user?.organisation?.name}</td>
                <td className="px-6 py-4">{user?.county}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    {user?.isAdmin ? (
                      <FaCheck className="text-green-400" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center ">
                  <div className="flex items-center justify-center">
                    {user?.acceptTermsAndConditions ? (
                      <FaCheck className="text-green-400" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    {user?.emailVerified ? (
                      <FaCheck className="text-green-400" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-center">
                    <Button
                      type="button"
                      disabled={false}
                      variant="outline"
                      leftIcon={<FaEdit fontSize={14} />}
                      className="font-medium text-blue-600  "
                      onClick={() => {
                        setUser(user)
                        setOpen(true)
                    }}
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default AdminUsersTable
