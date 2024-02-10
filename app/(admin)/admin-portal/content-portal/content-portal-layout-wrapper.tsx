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
import { globalSelector } from "@global-state/features/global/globalSlice";
import { useAppSelector } from "@global-state/hooks";

export function CountyPortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size] = useWindowSize();
  const { feedContents, isLoadingFeedContents } = useContentController();
  const { drawerOpened } = useAppSelector(globalSelector);

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
    <section className=" grid w-full grid-cols-1 md:grid-cols-4 lg:grid-cols-8">
      <aside
        className={` top-0 col-span-1 h-full w-[200px] bg-background shadow-md transition-all duration-500 ease-in-out`}
      >
        <div className="mb-4 hidden w-full bg-background lg:block ">
          <SidebarNav
            height={size?.innerHeight as number}
            items={sidebarNavItems as SidebarNavProps["items"]}
            title="Content Location"
          />
        </div>
        <div className="mb-4 block  overflow-hidden lg:hidden ">
          <MobileSideNav
            height={size?.innerHeight as number}
            items={sidebarNavItems as SidebarNavProps["items"]}
            title="Counties"
          />
        </div>
      </aside>
      <section
        className={`${
          drawerOpened ? "sm:pl-24" : "sm:px-16"
        }col-span-1 mx-auto w-full overflow-y-auto px-2 transition-all duration-500 ease-in-out sm:container sm:max-w-screen-sm md:col-span-3 md:max-w-screen-sm lg:col-span-7 lg:max-w-screen-lg `}
      >
        {children}
      </section>
    </section>
  );
}
