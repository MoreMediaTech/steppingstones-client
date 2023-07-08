import { columns } from './table-columns'
import { DataTable } from '@components/table/data-table'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

const AdminUsersTable = ({
  users,
  handleSearch,
  handleSelect,
}: {
  users: UserSchemaWithIdAndOrganisationType[]
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
