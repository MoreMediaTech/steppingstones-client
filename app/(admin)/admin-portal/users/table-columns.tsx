import { ColumnDef } from "@tanstack/react-table";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";

// components
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { DataTableRowActions } from "@components/table/data-table-row-actions";
import { UpdateUserForm } from "./update-user-form";

// zod schemas
import { UserSchemaWithIdType } from "@models/User";

export const columns: ColumnDef<UserSchemaWithIdType>[] = [
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
        disabled={row.original.isDisabled}
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, isDisabled } = row.original;

      return (
        <div
          className={`${isDisabled ? "text-gray-400 line-through opacity-20" : ""} flex items-center justify-start`}
        >
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "organisation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organisation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const organisation = row.original.organisation;
      return (
        <div className="flex items-center justify-start">
          {organisation?.name}
        </div>
      );
    },
  },
  {
    accessorKey: "county",
    header: "County",
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin");
      return (
        <div className="flex items-center justify-center">
          {isAdmin ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "acceptTermsAndConditions",
    header: "Accept T & C",
    cell: ({ row }) => {
      const acceptTermsAndConditions = row.getValue("acceptTermsAndConditions");
      return (
        <div className="flex items-center justify-center">
          {acceptTermsAndConditions ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Email Verified",
    cell: ({ row }) => {
      const emailVerified = row.getValue("emailVerified");
      return (
        <div className="flex items-center justify-center">
          {emailVerified ? (
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
      const user = row.original;

      return (
        <DataTableRowActions
          row={row}
          enableEditItem
          editItem={<UpdateUserForm user={user} />}
        />
      );
    },
  },
];
