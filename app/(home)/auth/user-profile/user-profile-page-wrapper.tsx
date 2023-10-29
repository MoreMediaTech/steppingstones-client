"use client";
import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

const token =
  typeof window !== "undefined" ? localStorage.getItem("_ssapp:token") : null;

export default function UserProfilePageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {

  React.useEffect(() => {
    if (!token) {
      redirect("/auth/login");
    }
  }, [token]);

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
