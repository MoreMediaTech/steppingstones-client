'use client'
import { useCallback } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { DistrictSectionProps } from '@lib/types'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { DataTableRowActions } from '@components/table/data-table-row-actions'
import { useAppDispatch } from 'app/global-state/hooks'
import { setDistrictSection } from 'app/global-state/features/editor/editorSlice'
import { setOpenEditModal } from 'app/global-state/features/editor/editorSlice'

export const columns: ColumnDef<DistrictSectionProps>[] = [
  {
    id: 'select',
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            LA Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: 'isLive',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Live
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const isLive = row.getValue('isLive')
      return (
        <div className="flex items-center justify-center">
          {isLive ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <h3>Last Updated</h3>
        </div>
      )
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt')
      return (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 px-2 py-1 text-xs text-white shadow-lg">
            <p>
              {format(new Date(updatedAt as string), 'MM/dd/yyyy HH:mm:ss', {
                locale: enGB,
              })}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const dispatch = useAppDispatch()

      const handleEdit = useCallback((row: Row<DistrictSectionProps>) => {
        const districtSection = row.original
        dispatch(setDistrictSection(districtSection))
        dispatch(setOpenEditModal(true))
      }, [])

      return (
        <DataTableRowActions row={row} enableEdit handleEdit={handleEdit} />
      )
    },
  },
]
