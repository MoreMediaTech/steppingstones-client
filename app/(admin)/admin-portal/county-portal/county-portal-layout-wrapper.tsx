'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@components/mantine-components'
import PortalHeader from '@components/PortalHeader/PortalHeader'
import { SidebarNav, SidebarNavProps } from '@components/navigation/sidebar-nav'
import { useGetCountiesQuery } from 'app/global-state/features/editor/editorApiSlice'

export function CountyPortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: counties, isLoading } = useGetCountiesQuery()
  const sidebarNavItems = counties?.map((county) => ({
    title: county.name,
    href: `/admin-portal/county-portal/${county.name}?countyId=${county.id}`,
  }))

  return (
    <section className=' relative h-screen'>
      <PortalHeader
        title="UK Counties"
        subTitle="Please select from the menu below"
      />
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className="relative grid grid-cols-1 md:grid-cols-4">
          <aside className="md:col-span-1 h-full overflow-hidden  px-4  py-4 shadow-md md:h-screen sm:py-2">
            <SidebarNav items={sidebarNavItems as SidebarNavProps['items']} />
          </aside>
          <div className="md:col-span-3 h-screen overflow-y-scroll">{children}</div>
        </section>
      )}
    </section>
  )
}
