'use client'
import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

// components
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'

// hooks (Controller)
import useMessagesController from './use-messages-controller'

// zod schemas
import { PartialMessageSchemaProps } from '@models/Messages'


export const columns: ColumnDef<PartialMessageSchemaProps>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "from",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            from
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: "subject",
    cell: ({ row }) => {
      const message = row.original;
      const router = useRouter();
      const { handleUpdateIsRead } = useMessagesController();
      return (
        <div
          className="flex cursor-pointer items-center justify-start gap-2"
          onClick={() => {
            router.push(`/admin-portal/messages/${message.id}`);
            handleUpdateIsRead(message);
          }}
        >
          <p
            className={`${
              message.isRead
                ? "font-medium text-gray-600 dark:text-gray-500"
                : "font-semibold text-gray-400 dark:text-gray-300"
            }text-left text-base md:text-lg`}
          >
            {message?.subject}
          </p>
          <span className="w-2 border"></span>
          <p
            className={`${
              message.isRead ? "text-gray-700" : "text-gray-500"
            } whitespace-wrap text-ellipsis text-left text-xs md:text-sm`}
          >
            {message?.message}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <div className="flex items-center justify-start">
          <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 px-2 py-1 text-xs text-white shadow-lg">
            <p>
              {format(new Date(createdAt as string), "PPP", {
                locale: enGB,
              })}
            </p>
          </div>
        </div>
      );
    },
  },
];
