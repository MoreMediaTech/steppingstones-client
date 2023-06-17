import { CurrentUser } from '@lib/types'
import { columns } from './table-columns'
import { DataTable } from '@components/table/data-table'

const AdminUsersTable = ({
  users,
  handleSearch,
  handleSelect,
}: {
  users: CurrentUser[]
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <>
      <DataTable columns={columns} data={users} name="name" />
    </>
  )
}

export default AdminUsersTable
