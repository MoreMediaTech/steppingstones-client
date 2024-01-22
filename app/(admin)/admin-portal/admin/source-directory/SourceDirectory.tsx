"use client";

import React from "react";

// components
import Loader from "@components/Loader";
import { SourceDirectoryTable } from "./SourceDirectoryTable";
import SearchForm from "./SearchForm";

// hooks (Controller)
import useSourceDirectoryController from "./use-source-directory-controller";
import { PartialSourceDirectoryProps } from "@models/SourceDirectory";

export function SourceDirectory() {
  const { sourceData, isLoading, form } = useSourceDirectoryController();

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }
  return (
    <section className="relative px-1 py-1 dark:text-gray-200 space-y-4 md:mx-auto md:w-full">
      <SearchForm  />
      <SourceDirectoryTable
        data={sourceData as PartialSourceDirectoryProps[]}
      />
    </section>
  );
}
