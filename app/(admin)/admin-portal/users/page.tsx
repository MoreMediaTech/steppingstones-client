'use client'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { AdminUsersSection } from './AdminUsersSection'
import Header from 'app/components/Header'
import { CreateAdminForm } from './CreateAdminForm'


export default function Users() {
  const { data: user } = useGetUserQuery()

  return (
      <section className="my-4 mb-8 mt-4 space-y-4 overflow-y-auto overflow-x-hidden rounded-md border px-2 py-2 sm:mx-auto sm:max-w-screen-lg sm:px-4">
        <div className="grid grid-cols-1">
          <div className="flex w-full items-center justify-between py-4">
            <Header title="Users" order={2} />
            {user?.isSuperAdmin && (
              <CreateAdminForm  />
            )}
          </div>
          <AdminUsersSection />
        </div>
      </section>
  )
}
