'use client'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'
import { SourceDirectory } from 'app/(admin)/admin-portal/admin/source-directory/SourceDirectory'
import Header from 'app/components/Header'

export default function SourceDirectoryPage() {
  const { data: user } = useGetUserQuery()
  return (
    <section className="overflow-auto md:h-screen">
      <PortalHeader
        user={user as CurrentUser}
        imgUrl={user?.imageUrl}
        title={`${user?.name}`}
        subTitle="Source Directory"
      />
      <section className="mx-auto mt-4 mb-8 w-full overflow-y-auto rounded-md border px-2 py-2 sm:px-4 md:max-w-screen-lg">
        <Header title="Source Directory" order={2} />
        <SourceDirectory />
      </section>
    </section>
  )
}
