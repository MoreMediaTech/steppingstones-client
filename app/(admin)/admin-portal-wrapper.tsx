"use client";
import React from "react";
import { motion } from "framer-motion";

// redux global state (Model)
import { useGetUserQuery } from "@app/global-state/features/user/usersApiSlice";
import { globalSelector } from "@global-state/features/global/globalSlice";
import { useAppSelector } from "@global-state/hooks";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// components
import { ComponentShield } from "@components/NextShield";
import { AdminSidebar, MobileAdminSidebar } from "@components/navigation";
import { AdminNavbar } from "@components/navigation/admin-navbar";
import { getSession } from "@lib/getSession";
import { redirect } from "next/navigation";

function checkIsAuthenticated() {
  const session = getSession();

  if (!session) {
    return false;
  } else {
    console.log("Session found");
    return true;
  }
}

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  isAuthenticated?: boolean;
}) {
  const [size] = useWindowSize();
  const { drawerOpened } = useAppSelector(globalSelector);
  const isAuthenticated = checkIsAuthenticated();

  const { data: user } = useGetUserQuery(undefined, { skip: !isAuthenticated });

  // const SCROLL_AREA_HEIGHT = (size?.innerHeight as number) - 10;

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className} flex max-h-screen min-h-screen min-w-full flex-col bg-background  `}
    >
      <ComponentShield
        RBAC
        showForRole={["EDITOR", "ADMIN", "SUPERADMIN"]}
        userRole={user?.role as string}
      >
        <div className="">
          <div className="block bg-background px-2 md:hidden ">
            <MobileAdminSidebar height={size?.innerHeight as number} />
          </div>
          <aside className="hidden md:block">
            <AdminSidebar height={size?.innerHeight as number} />
          </aside>
        </div>
        <section className="relative grid grid-cols-1 bg-background transition-all duration-500  ease-in-out">
          <div className="hidden md:block">
            <AdminNavbar />
          </div>
          <div
            className={`${
              drawerOpened ? "md:ml-72" : "md:ml-20"
            } my-4 flex flex-grow bg-background transition-all duration-500 ease-in-out md:my-20 md:p-6  `}
          >
            {children}
          </div>
        </section>
      </ComponentShield>
    </motion.main>
  );
}

export default PageWrapper;
