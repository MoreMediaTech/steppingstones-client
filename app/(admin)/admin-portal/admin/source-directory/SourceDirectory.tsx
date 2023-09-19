"use client";

import React from "react";

// components
import { Loader } from "@components/mantine-components";
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
        <Loader size="xl" variant="bars" />
      </div>
    );
  }
  return (
    <section className="relative mx-2 px-1 py-1 shadow-md  dark:text-gray-200 md:mx-auto md:w-full md:px-4">
      <SearchForm register={form.register} types={["BSI", "IS", "EU"]} />
      <SourceDirectoryTable
        data={sourceData as PartialSourceDirectoryProps[]}
      />
    </section>
  );
}
