"use client";

import React, { useCallback } from "react";

// components
import { Modal } from "@components/mantine-components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { columns } from "./sub-section-table-column";
import { DataTable } from "@components/table/data-table";

// zod schema
import { PartialSectionSchemaProps } from "@models/Section";

export function SubSectionsTable({
  subSectionData,
  deleteManySubsectionsHandler,
}: {
  subSectionData: PartialSectionSchemaProps['subSections'];
  deleteManySubsectionsHandler: (rows: PartialSectionSchemaProps[]) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-900 dark:border-gray-200 "
        >
          SubSections
        </Button>
      </DialogTrigger>
      <DialogContent className=" overflow-x-auto sm:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Sub Sections</DialogTitle>
          <DialogDescription>The content sections for</DialogDescription>
        </DialogHeader>
        <DataTable
          columns={columns}
          data={subSectionData as PartialSectionSchemaProps[]}
          name="name"
          handleDeleteManyById={deleteManySubsectionsHandler}
        />
      </DialogContent>
    </Dialog>
  );
}
