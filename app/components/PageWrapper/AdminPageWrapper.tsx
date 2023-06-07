'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ComponentShield } from 'app/components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'

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
        {children}
      </ComponentShield>
    </motion.main>
  )
}

export default PageWrapper
