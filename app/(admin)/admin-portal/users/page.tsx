'use client'
import { useState } from 'react'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { AdminUsersSection } from './AdminUsersSection'
import Header from 'app/components/Header'
import { Button } from '@components/ui/button'
import { CreateAdminForm } from './CreateAdminForm'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'


export default function Users() {
  const { data: user, refetch } = useGetUserQuery()
  const [opened, setOpened] = useState(false)
  return (
  
      <section className="my-4 mb-8 mt-4 space-y-4 overflow-y-auto overflow-x-hidden rounded-md border px-2 py-2 sm:mx-auto sm:max-w-screen-lg sm:px-4">
        <div className="grid grid-cols-1">
          <div className="flex w-full items-center justify-between py-4">
            <Header title="Users" order={2} />
            {user?.isSuperAdmin && (
              <CreateAdminForm refetch={refetch} />
            )}
          </div>
          <AdminUsersSection />
        </div>
      </section>
     

  )
}
