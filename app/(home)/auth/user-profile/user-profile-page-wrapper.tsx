"use client";

import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

// redux store (Model)
import { authSelector } from "@app/global-state/features/auth/authSlice";
import { useAppSelector } from "@global-state/hooks";

export default function UserProfilePageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isAuthenticated } = useAppSelector(authSelector);

  if (!isAuthenticated) {
    redirect("/auth/login");
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className}  min-h-screen w-full`}
    >
      {children}
    </motion.section>
  );
}
