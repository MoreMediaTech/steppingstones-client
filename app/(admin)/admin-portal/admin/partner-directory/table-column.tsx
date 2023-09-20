"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { DataTableRowActions } from "@components/table/data-table-row-actions";

// zod schemas
import {
  PartialPartnerWithOrganisationProps,
  PartnerWithOrganisationProps,
} from "@models/Partner";

// components
import { UpdatePartnerForm } from "./updatePartnerForm";
import HandleDeleteModal from "@components/HandleDeleteModal/HandleDeleteModal";

// hooks  (Controller)
import usePartnerDirectoryController from "./use-partner-directory-controller";

export const columns: ColumnDef<PartialPartnerWithOrganisationProps>[] = [
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
    accessorKey: "organisation",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Organisation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const organisation = row.original.organisation;
      return (
        <p className="text-left text-sm font-medium">{organisation?.name}</p>
      );
    },
  },
  {
    accessorKey: "projectsResponsibleFor",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "closingDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Closing
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const closingDate = row.getValue("closingDate");
      return (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 px-2 py-1 text-xs text-white shadow-lg">
            <p>
              {format(new Date(closingDate as string), "MM/dd/yyyy", {
                locale: enGB,
              })}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "partner",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const partner = row.original.partner;
      return <p className="text-left text-sm font-medium">{partner?.name}</p>;
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Position
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email Address
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const partner = row.original.partner;
      return (
        <a
          href={`mailto:${partner?.email}`}
          className='className="text-left font-medium" text-sm hover:underline'
        >
          {partner?.email}
        </a>
      );
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const partner = row.original;

      const { deleteHandler } = usePartnerDirectoryController();
      return (
        <DataTableRowActions
          row={row}
          enableEditItem
          enableDeleteItem
          editItem={<UpdatePartnerForm partner={partner} />}
          deleteItem={
            <HandleDeleteModal
              data={partner as PartnerWithOrganisationProps}
              deleteHandler={deleteHandler}
            />
          }
        />
      );
    },
  },
];
