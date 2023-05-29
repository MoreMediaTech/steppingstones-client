import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'


export default function Advertisements() {
  const { data: user } = useGetUserQuery()
  return (
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role as string}
        >
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="Manage Adverts"
          />
          <section className="overflow-y-auto">
            <h1 className="px-4 text-2xl font-bold">Advertisements</h1>
          </section>
        </ComponentShield>
  )
}

