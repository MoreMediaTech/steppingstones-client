'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@components/mantine-components'
import PortalHeader from '@components/PortalHeader/PortalHeader'
import { MobileSideNav, SidebarNav, SidebarNavProps } from '@components/navigation/sidebar-nav'
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
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className="relative grid grid-cols-1 lg:grid-cols-5">
          <aside className="lg:col-span-1 h-full overflow-hidden hidden lg:block  px-4  py-4 shadow-md lg:h-screen sm:py-2">
            <SidebarNav items={sidebarNavItems as SidebarNavProps['items']} title='Counties'/>
          </aside>
          <div className="lg:col-span-1 h-full overflow-hidden block lg:hidden  px-4  py-4 lg:h-screen sm:py-2">
            <MobileSideNav items={sidebarNavItems as SidebarNavProps['items']} title='Counties'/>
          </div>
          <div className="lg:col-span-4 h-screen">{children}</div>
        </section>
      )}
    </section>
  )
}
