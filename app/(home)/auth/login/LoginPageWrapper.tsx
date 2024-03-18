"use client";
import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// redux store (Model)
import { useAppDispatch } from "app/global-state/hooks";
import { setAuthState } from "app/global-state/features/auth/authSlice";

export function getSession() {
  const session = cookies().get("connect.sid")?.value;
  if (!session) return null;
  return session;
}

function checkIsAuthenticated() {
  const session = getSession();

  if (!session) {
    return false;
  } else {
    return true;
  }
}

export default function LoginPageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  isAuthenticated?: boolean;
}) {
  const dispatch = useAppDispatch();
  const isAuthenticated = checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/admin-portal");
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(setAuthState({ isAuthenticated: isAuthenticated }));
    }
  }, [isAuthenticated]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className}  w-full`}
    >
      {children}
    </motion.section>
  );
}
