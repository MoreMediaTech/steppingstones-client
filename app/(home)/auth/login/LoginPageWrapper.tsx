"use client";
import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

// redux store (Model)
import { userSelector } from "@app/global-state/features/user/userSlice";
import { useAppSelector } from "@global-state/hooks";

import useHasMounted from "@hooks/useHasMounted";

// utils
import { cn } from "@lib/utils";

export default function LoginPageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={cn(` min-h-screen w-full`, className)}
    >
      {children}
    </motion.section>
  );
}
