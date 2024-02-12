"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import Image from "next/image";

// components
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { DataTableRowActions } from "@components/table/data-table-row-actions";
import HandleDeleteModal from "@components/HandleDeleteModal/HandleDeleteModal";

// zod schema
import { PartialSectionSchemaProps, SectionSchemaProps } from "@models/Section";

// hooks (Controller)
import useSectionSettingController from "./use-section-setting-controller";

export const columns: ColumnDef<PartialSectionSchemaProps>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Section Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "feedContent",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Location
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const section = row.original;
      return (
        <div className="flex items-center justify-start space-x-2">
          <div
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#5E17EB] p-1"
            style={{ position: "relative", height: "40px" }}
          >
            <Image
              src={
                section.feedContent?.logoIcon ??
                "https://res.cloudinary.com/dhdcepksp/image/upload/v1695671545/icon_x68kbx.png"
              }
              alt={section.feedContent?.name as string}
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
          </div>
          <div className="text-xs font-semibold sm:text-base">
            <p>{section.feedContent?.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isLive",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Live
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isLive = row.getValue("isLive");
      return (
        <div className="flex items-center justify-center">
          {isLive ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <h3>Last Updated</h3>
        </div>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt");
      return (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 px-2 py-1 text-xs text-white shadow-lg">
            <p>
              {format(new Date(updatedAt as string), "MM/dd/yyyy HH:mm:ss", {
                locale: enGB,
              })}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const section = row.original;

      const { handleDelete } = useSectionSettingController();
      return <DataTableRowActions row={row} enableDeleteItem deleteItem={
        <HandleDeleteModal data={section as SectionSchemaProps} deleteHandler={handleDelete} />
      } />;
    },
  },
];
