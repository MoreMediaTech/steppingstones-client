'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@components/mantine-components'
import {
  MobileSideNav,
  SidebarNav,
  SidebarNavProps,
} from '@components/navigation/sidebar-nav'
import { useGetCountiesQuery } from 'app/global-state/features/editor/editorApiSlice'
import useWindowSize from '@hooks/useWindowSize'

export function CountyPortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [size] = useWindowSize()
  const { data: counties, isLoading } = useGetCountiesQuery()
  const sidebarNavItems = counties?.map((county) => ({
    title: county.name,
    href: `/admin-portal/county-portal/${county.name}?countyId=${county.id}`,
  }))

  return (
    <section className=" relative h-screen">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className="relative grid grid-cols-1 lg:grid-cols-5">
          <aside className="hidden h-full overflow-hidden px-1 py-4  shadow-md  sm:py-2 lg:col-span-1 lg:block lg:h-screen">
            <SidebarNav
              height={size.innerHeight as number}
              items={sidebarNavItems as SidebarNavProps['items']}
              title="Counties"
            />
          </aside>
          <div className="block h-full lg:hidden overflow-hidden px-4 py-4 ">
            <MobileSideNav
              height={size.innerHeight as number}
              items={sidebarNavItems as SidebarNavProps['items']}
              title="Counties"
            />
          </div>
          <div className="h-screen lg:col-span-4">{children}</div>
        </section>
      )}
    </section>
  )
}
