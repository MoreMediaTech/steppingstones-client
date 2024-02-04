"use client";

import React from "react";

// components
import Loader from "@components/Loader";
import {
  MobileSideNav,
  SidebarNav,
  SidebarNavProps,
} from "@components/navigation/sidebar-nav";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// hooks (Controller)
import useContentController from "./use-content-controller";

export function CountyPortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size] = useWindowSize();
  const { feedContents, isLoadingFeedContents } = useContentController();

  const sidebarNavItems = feedContents?.map((content) => ({
    title: content.name,
    href: `/admin-portal/content-portal/${content.name}?contentId=${content.id}`,
  }));

  if (isLoadingFeedContents) {
    <div className="flex h-screen items-center justify-center">
      <Loader className="h-12 w-12" />
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
