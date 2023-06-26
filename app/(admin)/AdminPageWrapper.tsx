'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ComponentShield } from 'app/components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { AdminSidebar } from 'app/components/navigation'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { data: user } = useGetUserQuery()
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className}  w-full`}
    >
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="grid">
          <PortalHeader
            user={user as CurrentUser}
            title={`Welcome ${user?.name}`}
            subTitle="Please select from the menu below"
            imgUrl={user?.imageUrl}
          />
          <section className="grid ">
            <div className="col-span-1 sm:col-span-1"></div>
            <div className="col-span-1 sm:col-span-1">{children}</div>
          </section>
        </section>
      </ComponentShield>
    </motion.main>
  )
}

export default PageWrapper
