'use client';
import React from 'react'
import { motion } from 'framer-motion'

// redux store (Model)
import { useAppDispatch, useAppSelector } from "app/global-state/hooks";
import {
  setIsVisible,
  globalSelector,
} from "app/global-state/features/global/globalSlice";
import { setAuthState } from 'app/global-state/features/auth/authSlice'
import { setCookie } from '@components/CookieConsent/actions';

const token = typeof window !== 'undefined' ? localStorage.getItem('_ssapp:token') : null

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const dispatch = useAppDispatch()
  const { isVisible, displayCookieConsent } = useAppSelector(globalSelector);

  React.useEffect(() => {
    if(token){
      dispatch(setAuthState({ isAuthenticated: true, token: token as string }))
    }
  }, [token])

  React.useEffect(() => {
    function watchScroll() {
      // if cookie undefined or debug
      if (!isVisible && displayCookieConsent) {
        setCookie("ssapp-cookie-consent", false);
        dispatch(setIsVisible(false));
      }else if (!isVisible && !displayCookieConsent) {
        setCookie("ssapp-cookie-consent", false);
        dispatch(setIsVisible(true));
      } else {
        setCookie("ssapp-cookie-consent", true);
        dispatch(setIsVisible(false));
      }
    }
    watchScroll();
  }, []);

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
