'use client';
import React from 'react'
import { motion } from 'framer-motion'

// redux store (Model)
import { useAppDispatch } from 'app/global-state/hooks'
import { setAuthState } from 'app/global-state/features/auth/authSlice'

const token = typeof window !== 'undefined' ? localStorage.getItem('_ssapp:token') : null

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if(token){
      dispatch(setAuthState({ isAuthenticated: true, token: token as string }))
    }
  }, [token])

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
