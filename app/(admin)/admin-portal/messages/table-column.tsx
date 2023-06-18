'use client'
import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { MessageProps } from '@lib/types'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import useMessage from './use-message'

export const columns: ColumnDef<MessageProps>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'from',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            from
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: 'subject',
    header: 'subject',
    cell: ({ row }) => {
      const message = row.original
      const router = useRouter()
      const { handleUpdateIsRead } = useMessage()
      return (
        <div
          className="flex cursor-pointer items-center justify-start gap-2"
          onClick={() => {
            router.push(`/admin-portal/messages/${message.id}`)
            handleUpdateIsRead(message)
          }}
        >
          <p
            className={`${
              message.isRead
                ? 'font-medium text-gray-400 dark:text-gray-300'
                : 'font-semibold text-gray-600 dark:text-gray-500'
            }text-left text-base md:text-lg`}
          >
            {message?.subject}
          </p>
          <span className="w-2 border"></span>
          <p
            className={`${
              message.isRead ? 'text-gray-500' : 'text-gray-700'
            } whitespace-wrap text-ellipsis text-left text-xs md:text-sm`}
          >
            {message?.message}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: '',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return (
        <div className="flex items-center justify-start">
          <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 px-2 py-1 text-xs text-white shadow-lg">
            <p>
              {format(new Date(createdAt as string), 'PPP', {
                locale: enGB,
              })}
            </p>
          </div>
        </div>
      )
    },
  },
]
