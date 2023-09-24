"use client";

import React from "react";

// components
import { Loader } from "@components/mantine-components";
import {
  MobileSideNav,
  SidebarNav,
  SidebarNavProps,
} from "@components/navigation/sidebar-nav";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// hooks (Controller)
import useCountyController from "./use-county-controller";

export function CountyPortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size] = useWindowSize();
  const { counties, isLoadingCounties } = useCountyController();

  const sidebarNavItems = counties?.map((county) => ({
    title: county.name,
    href: `/admin-portal/county-portal/${county.name}?countyId=${county.id}`,
  }));

  if (isLoadingCounties) {
    <div className="flex h-screen items-center justify-center">
      <Loader size="xl" variant="bars" />
    </div>;
  }

  return (
    <section className="relative h-screen w-full">
      <section className="relative flex w-full flex-col sm:flex-row">
        <aside
          className={`z-50 hidden h-full w-64  overflow-x-hidden shadow-md transition-all duration-500 ease-in-out  md:relative  md:block md:h-screen`}
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
          className={`w-full overflow-y-auto transition-all duration-500 ease-in-out md:container md:mx-auto  md:inline-flex`}
        >
          {children}
        </section>
      </section>
    </section>
  );
}
