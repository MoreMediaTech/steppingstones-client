'use client';
import React from 'react'
import { motion } from 'framer-motion'


function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className}  w-full`}
    >
      {children}
    </motion.main>
  )
}

export default PageWrapper
