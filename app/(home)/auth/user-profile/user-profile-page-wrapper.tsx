"use client";

import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { getSession } from "@lib/getSession";

function checkIsAuthenticated() {
  const session = getSession();

  if (!session) {
    return false;
  } else {
    return true;
  }
}

export default function UserProfilePageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isAuthenticated = checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }
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
