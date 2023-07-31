'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ComponentShield } from 'app/components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'
import { AdminSidebar, MobileAdminSidebar } from '@components/navigation'
import useWindowSize from '@hooks/useWindowSize'
import { ScrollArea } from '@components/ui/scroll-area'

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [size] = useWindowSize()
  const SCROLL_AREA_HEIGHT = size.innerHeight as number - 10
  const { data: user } = useGetUserQuery()
  const userFirstName = user?.name.split(' ')[0]
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className} h-screen  w-full`}
    >
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="relative">
          <section className="relative flex flex-col md:flex-row">
            <aside className="hidden px-4 md:block h-screen">
              <AdminSidebar height={size.innerHeight as number} />
            </aside>
            <div className="block md:hidden h-full px-4 py-4 ">
              <MobileAdminSidebar height={size.innerHeight as number} />
            </div>
            <ScrollArea className="relative w-full" style={{ height: SCROLL_AREA_HEIGHT }}>
              {/* <PortalHeader
                user={user as UserSchemaWithIdAndOrganisationType}
                title={`Welcome ${userFirstName}`}
                subTitle="Please select from the menu below"
                imgUrl={user?.imageUrl}
              /> */}
              <div>{children}</div>
            </ScrollArea>
          </section>
        </section>
      </ComponentShield>
    </motion.main>
  )
}

export default PageWrapper
