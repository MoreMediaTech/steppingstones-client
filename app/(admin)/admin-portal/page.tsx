'use client'
import { Loader } from '@components/mantine-components'

import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import PortalSection from 'app/components/PortalHeader/PortalSection'
import { RenderInsights } from './Insights'

export default function AdminPortal() {
  const { data: user, isLoading } = useGetUserQuery()
  return (
    <>

      {isLoading ? (
        <div className="flex h-[700px] items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <>
        <RenderInsights />
        </>
      )}
    </>
  )
}
