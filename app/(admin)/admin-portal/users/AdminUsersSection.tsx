// component
import { Loader } from '@components/mantine-components'
import AdminUsersTable from './AdminUsersTable'

// zod schemas
import { UserSchemaWithIdType } from '@models/User'

// hooks (Controller)
import useUsersController from './useUsersController'

export function AdminUsersSection() {
  const { users, isLoading } = useUsersController()

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }
  return (
    <section>
      <AdminUsersTable users={users as UserSchemaWithIdType[]} />
    </section>
  )
}
