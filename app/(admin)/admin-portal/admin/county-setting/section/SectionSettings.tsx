"use client";

import React from "react";
import { Loader } from "@components/mantine-components";

import {SectionsTable} from "./SectionsTable";

import useSectionSettingController from "./use-section-setting-controller";

export function SectionsSettings() {
  const { isLoadingSections } = useSectionSettingController();

  if (isLoadingSections) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <>
      <SectionsTable />
    </>
  );
}

