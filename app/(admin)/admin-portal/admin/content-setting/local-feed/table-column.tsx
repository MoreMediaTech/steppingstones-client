"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import Image from "next/image";

// hooks (Controller)
import useDistrictSettingController from "./use-local-feed-setting-controller";

// zod schema
import { LocalFeedContentSchemaProps, PartialLocalFeedContentSchemaProps } from "@models/LocalFeedContent";

// components
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { DataTableRowActions } from "@components/table/data-table-row-actions";
import LocalFeedSectionsTable from "./local-feed-sections-table";
import UpdateDistrictForm from "./update-local-feed-form";
import HandleDeleteModal from "@components/HandleDeleteModal/HandleDeleteModal";

export const columns: ColumnDef<PartialLocalFeedContentSchemaProps>[] = [
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
            District Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const localFeed = row.original;
      return (
        <div className="flex items-center justify-start space-x-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary-dark-200 p-1">
            <Image
              src={localFeed.imageUrl ?? "/public/steppingstonesapplogo.png"}
              alt={localFeed.name as string}
              sizes="40px"
              width={40}
              height={40}
            />
          </div>
          <div className="text-xs font-semibold sm:text-base ">
            <p>{localFeed?.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "county",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            County
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const localFeed = row.original;
      return (
        <div className="flex items-center justify-start space-x-2">
          <div className="relative flex h-10 w-10 items-center overflow-hidden rounded-full border-2 border-[#5E17EB] p-1">
            <Image
              src={
                localFeed.feedContent?.logoIcon ??
                "/public/steppingstonesapplogo.png"
              }
              alt={localFeed.feedContent?.name as string}
              sizes="40px"
              width={40}
              height={40}
            />
          </div>
          <div className="text-xs font-semibold sm:text-base">
            <p>{localFeed.feedContent?.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sections",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            localFeed Sections
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const localFeed = row.original;
      return (
        <div className="flex items-center ">
          <LocalFeedSectionsTable localFeedData={localFeed} />
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
      const district = row.original;

      const { deleteLocalFeedContentHandler } = useDistrictSettingController();

      return (
        <DataTableRowActions
          row={row}
          enableEditItem
          enableDeleteItem
          editItem={<UpdateDistrictForm data={district} />}
          deleteItem={
            <HandleDeleteModal
              data={district as LocalFeedContentSchemaProps}
              deleteHandler={deleteLocalFeedContentHandler}
            />
          }
        />
      );
    },
  },
];
