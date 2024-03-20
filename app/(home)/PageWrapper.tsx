"use client";
import React from "react";
import { motion } from "framer-motion";

// redux global state (Model)
import { useAppDispatch, useAppSelector } from "app/global-state/hooks";
import { useGetUserQuery } from "@app/global-state/features/user/usersApiSlice";
import {
  setIsVisible,
  globalSelector,
} from "app/global-state/features/global/globalSlice";
import {
  setAuthState,
  authSelector,
} from "app/global-state/features/auth/authSlice";

import { setCookie } from "@components/CookieConsent/actions";

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  isAuthenticated?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { isVisible, displayCookieConsent } = useAppSelector(globalSelector);

  React.useEffect(() => {
    function watchScroll() {
      // if cookie undefined or debug
      if (!isVisible && displayCookieConsent) {
        setCookie("ssapp-cookie-consent", false);
        dispatch(setIsVisible(false));
      } else if (!isVisible && !displayCookieConsent) {
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
      className={`${className}  h-full w-full`}
    >
      {children}
    </motion.main>
  );
}

export default PageWrapper;
