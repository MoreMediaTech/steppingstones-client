"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { DataTableRowActions } from "@components/table/data-table-row-actions";
import { UpDateSourceForm } from "./updateSourceForm";
import HandleDeleteModal from "@components/HandleDeleteModal/HandleDeleteModal";

// zod schemas
import {
  PartialSourceDirectoryProps,
  SourceDirectoryProps,
} from "@models/SourceDirectory";

// hooks (Controller)
import useSourceDirectoryController from "./use-source-directory-controller";

export const columns: ColumnDef<PartialSourceDirectoryProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "webLink",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Web-Link
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "canEmail",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email Alerts
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const canEmail = row.getValue("canEmail");
      return (
        <div className="flex items-center justify-center">
          {canEmail ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const source = row.original;
      const { deleteHandler } = useSourceDirectoryController();

      return (
        <DataTableRowActions
          row={row}
          enableEditItem
          enableDeleteItem
          editItem={<UpDateSourceForm data={source} />}
          deleteItem={
            <HandleDeleteModal
              data={source as SourceDirectoryProps}
              deleteHandler={deleteHandler}
            />
          }
        />
      );
    },
  },
];
