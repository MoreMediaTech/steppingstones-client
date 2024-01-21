"use client";

import React from "react";


import {SectionsTable} from "./SectionsTable";
import Loader from "@components/Loader";

import useSectionSettingController from "./use-section-setting-controller";

export function SectionsSettings() {
  const { isLoadingSections } = useSectionSettingController();

  if (isLoadingSections) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <>
      <SectionsTable />
    </>
  );
}

