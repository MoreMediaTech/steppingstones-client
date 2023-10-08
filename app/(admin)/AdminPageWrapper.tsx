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
import { AppShell } from "@components/mantine-components";
import { ScrollArea } from "@components/ui/scroll-area";

const token =
  typeof window !== "undefined" ? localStorage.getItem("_ssap:token") : null;

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

  const SCROLL_AREA_HEIGHT = (size?.innerHeight as number) - 10;

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
      className={`${className} h-screen  `}
    >
      <ComponentShield
        RBAC
        showForRole={"SS_EDITOR"}
        userRole={user?.role as string}
      >
        <AppShell
          withBorder={false}
          className="bg-background transition-all duration-500  ease-in-out"
          header={{ height: { base: 48, md: 0 } }}
          navbar={{
            width: drawerOpened ? 288 : 80,
            breakpoint: "md",
          }}
        >
          <AppShell.Header>
            <div className="block px-2 md:hidden ">
              <MobileAdminSidebar height={size?.innerHeight as number} />
            </div>
          </AppShell.Header>
          <AppShell.Navbar>
            <aside className="hidden h-screen md:block">
              <AdminSidebar height={size?.innerHeight as number} />
            </aside>
          </AppShell.Navbar>
          <AppShell.Main className="bg-background transition-all duration-500  ease-in-out">
            <ScrollArea
              className="relative w-full"
              style={{ height: SCROLL_AREA_HEIGHT }}
            >
              {/* <PortalHeader
                user={user as UserSchemaWithIdType}
                title={`Welcome ${userFirstName}`}
                subTitle="Please select from the menu below"
                imgUrl={user?.imageUrl}
              /> */}
              <section
                className={`${
                  drawerOpened ? "md:ml-72" : "md:ml-20"
                } transition-all p-4 duration-500  ease-in-out `}
              >
                {children}
              </section>
            </ScrollArea>
          </AppShell.Main>
        </AppShell>
      </ComponentShield>
    </motion.main>
  );
}

export default PageWrapper;
