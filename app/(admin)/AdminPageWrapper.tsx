"use client";
import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

// redux global state (Model)
import { useGetUserQuery } from "@app/global-state/features/user/usersApiSlice";
import { globalSelector } from "@global-state/features/global/globalSlice";
import { useAppSelector } from "@global-state/hooks";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// components
import { ComponentShield } from "@components/NextShield";
import { AdminSidebar, MobileAdminSidebar } from "@components/navigation";


const token =
  typeof window !== "undefined" ? localStorage.getItem("_ssapp:token") : null;

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [size] = useWindowSize();
  const { drawerOpened } = useAppSelector(globalSelector);
  const { data: user } = useGetUserQuery();

  // const SCROLL_AREA_HEIGHT = (size?.innerHeight as number) - 10;

  React.useEffect(() => {
    const handleRouteChange = () => {
      if (!token) {
        redirect("/auth/login");
      }
    };
    handleRouteChange();
  }, [token]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className={`${className} flex min-h-screen flex-col min-w-full bg-background max-h-screen  `}
    >
      <ComponentShield
        RBAC
        showForRole={["EDITOR","ADMIN", "SUPERADMIN"]}
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
        <section
          className="bg-background transition-all duration-500  ease-in-out"
         
        >
          <div
            className={`${
              drawerOpened ? "md:ml-72" : "md:ml-20"
            } bg-background my-4 md:my-0 md:p-6 transition-all duration-500  ease-in-out flex flex-grow  `}
          >
            {children}
          </div>
        </section>
      </ComponentShield>
    </motion.main>
  );
}

export default PageWrapper;
