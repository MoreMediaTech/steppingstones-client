'use client'
import React from 'react'
import { motion } from 'framer-motion'

// redux global state (Model)
import { useGetUserQuery } from '@global-state/features/user/usersApiSlice'
import { globalSelector } from "@global-state/features/global/globalSlice";
import { useAppSelector } from "@global-state/hooks";
// hooks
import useWindowSize from '@hooks/useWindowSize'

// components
import { ComponentShield } from '@components/NextShield'
import { AdminSidebar, MobileAdminSidebar } from '@components/navigation'
import {  AppShell } from '@components/mantine-components'
import { ScrollArea } from '@components/ui/scroll-area'

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [size] = useWindowSize()
  const { drawerOpened } = useAppSelector(globalSelector);

  const SCROLL_AREA_HEIGHT = size?.innerHeight as number - 10
  const { data: user } = useGetUserQuery()
  const userFirstName = user?.name.split(' ')[0]


  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className} h-screen  `}
    >
      <ComponentShield
        RBAC
        showForRole={"SS_EDITOR"}
        userRole={user?.role as string}
      >
        <AppShell
          navbarOffsetBreakpoint="md"
          navbar={
            <aside className="hidden h-screen px-4 py-1 md:block">
              <AdminSidebar height={size?.innerHeight as number} />
            </aside>
          }
          header={
            <div className="block h-full px-4 py-4 md:hidden ">
              <MobileAdminSidebar height={size?.innerHeight as number} />
            </div>
          }
        >
          <ScrollArea
            className="relative w-full"
            style={{ height: SCROLL_AREA_HEIGHT }}
          >
            {/* <PortalHeader
                user={user as UserSchemaWithIdAndOrganisationType}
                title={`Welcome ${userFirstName}`}
                subTitle="Please select from the menu below"
                imgUrl={user?.imageUrl}
              /> */}
            <section
              className={`${
                drawerOpened ? "md:ml-72" : "md:ml-20"
              } transition-all duration-500  ease-in-out `}
            >
              {children}
            </section>
          </ScrollArea>
        </AppShell>
      </ComponentShield>
    </motion.main>
  );
}

export default PageWrapper
