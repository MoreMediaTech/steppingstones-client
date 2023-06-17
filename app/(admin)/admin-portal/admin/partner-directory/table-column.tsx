'use client'
import { useCallback } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { PartnerData } from '@lib/types'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { DataTableRowActions } from '@components/table/data-table-row-actions'
import { useAppDispatch } from 'app/global-state/hooks'
import {
  setOpenEditModal,
  setOpenDeleteModal,
  setPartner,
  setType,
} from 'app/global-state/features/editor/editorSlice'

export const columns: ColumnDef<PartnerData>[] = [
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
    accessorKey: 'organisation',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Organisation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const organisation = row.original.organisation
      return (
        <p className="text-left text-sm font-medium">{organisation?.name}</p>
      )
    },
  },
  {
    accessorKey: 'projectsResponsibleFor',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Project
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: 'closingDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Closing
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const closingDate = row.getValue('closingDate')
      return (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center rounded-lg bg-primary-dark-200 px-2 py-1 text-xs text-white shadow-lg">
            <p>
              {format(new Date(closingDate as string), 'MM/dd/yyyy', {
                locale: enGB,
              })}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'partner',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const partner = row.original.partner
      return <p className="text-left text-sm font-medium">{partner?.name}</p>
    },
  },
  {
    accessorKey: 'position',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Position
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    id: 'emailAddress',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email Address
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const partner = row.original.partner
      return (
        <a
          href={`mailto:${partner?.email}`}
          className='className="text-left font-medium" text-sm hover:underline'
        >
          {partner?.email}
        </a>
      )
    },
  },

  {
    id: 'action',
    cell: ({ row }) => {
      const dispatch = useAppDispatch()

      const handleEdit = useCallback((row: Row<PartnerData>) => {
        const partner = row.original
        dispatch(setPartner(partner))
        dispatch(setOpenEditModal(true))
        dispatch(setType('Update'))
      }, [])
      const handleDelete = useCallback((row: Row<PartnerData>) => {
        const partner = row.original
        dispatch(setPartner(partner))
        dispatch(setOpenDeleteModal(true))
      }, [])

      return (
        <DataTableRowActions
          row={row}
          enableEdit
          enableDelete
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )
    },
  },
]
