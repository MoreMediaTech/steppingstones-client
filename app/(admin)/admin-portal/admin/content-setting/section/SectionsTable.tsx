"use client";
import React from "react";

// components
import { DataTable } from "@components/table/data-table";
import { columns } from "./table-column";

// hooks (controller)
import useSectionSettingController from "./use-section-setting-controller";

// zod schema
import { PartialSectionSchemaProps } from "@models/Section";

export function SectionsTable() {
  const { sectionData, handleDeleteMany } = useSectionSettingController();

  return (
    <>
      <DataTable
        columns={columns}
        data={sectionData as PartialSectionSchemaProps[]}
        name="name"
        handleDeleteManyById={handleDeleteMany}
      />
    </>
  );
}
