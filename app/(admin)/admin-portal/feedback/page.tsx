'use client'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'

export default function Feedback() {
  const { data: user, refetch } = useGetUserQuery()
  return  (
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="View and respond to feedback"
          />
          <section className="overflow-y-auto">
            <h1 className="px-4 text-2xl font-bold">Feedback</h1>
          </section>
        </ComponentShield>

    )
}