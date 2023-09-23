"use client";
import React from "react";
import { Loader } from "@components/mantine-components";
import {
  MobileSideNav,
  SidebarNav,
  SidebarNavProps,
} from "@components/navigation/sidebar-nav";

// redux global state (Model)
import { useGetCountiesQuery } from "@global-state/features/editor/editorApiSlice";
import { globalSelector } from "@global-state/features/global/globalSlice";
import { useAppSelector } from "@global-state/hooks";

// hooks
import useWindowSize from "@hooks/useWindowSize";

export function CountyPortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size] = useWindowSize();
  const { drawerOpened } = useAppSelector(globalSelector);
  const { data: counties, isLoading } = useGetCountiesQuery();
  const sidebarNavItems = counties?.map((county) => ({
    title: county.name,
    href: `/admin-portal/county-portal/${county.name}?countyId=${county.id}`,
  }));

  return (
    <section className="relative h-screen w-full">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <>
          <section className="relative flex w-full flex-col sm:flex-row">
            <aside
              className={`hidden h-full md:relative w-64  z-50 overflow-x-hidden shadow-md transition-all duration-500  ease-in-out  md:block md:h-screen`}
            >
              <SidebarNav
                height={size?.innerHeight as number}
                items={sidebarNavItems as SidebarNavProps["items"]}
                title="Counties"
              />
              <div className="mb-4 block h-full overflow-hidden md:hidden ">
                <MobileSideNav
                  height={size?.innerHeight as number}
                  items={sidebarNavItems as SidebarNavProps["items"]}
                  title="Counties"
                />
              </div>
            </aside>
            <section
              className={`w-full overflow-y-auto md:container md:inline-flex md:mx-auto transition-all duration-500  ease-in-out`}
            >
              {children}
            </section>
          </section>
        </>
      )}
    </section>
  );
}
