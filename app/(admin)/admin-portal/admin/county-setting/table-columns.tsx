'use client'
import { useCallback } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { ArrowUpDown, Pen } from 'lucide-react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import Image from 'next/image'

import { CountyDataProps } from '@lib/types'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { DataTableRowActions } from '@components/table/data-table-row-actions'
import { useAppDispatch } from '@global-state/hooks'
import { setCounty } from '@global-state/features/editor/editorSlice'
import {
  setOpenDeleteModal,
} from '@global-state/features/editor/editorSlice'
import { useGetCountiesQuery } from '@global-state/features/editor/editorApiSlice'
import steppingstonesapplogo from '@public/steppingstonesapplogo.png'
import { UpdateCountyForm } from './UpdateCountyForm'

export const columns: ColumnDef<CountyDataProps>[] = [
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
            County Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const county = row.original
      return (
        <div className="flex items-center justify-start space-x-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary-dark-200 p-1">
            <Image
              src={county.logoIcon ?? steppingstonesapplogo}
              alt={county.name as string}
              fill
              sizes='(min-width: 640px) 100px, 50px'
            />
          </div>
          <div className="text-xs font-semibold sm:text-base ">
            <p>{county?.name}</p>
          </div>
        </div>
      )
    },
  },

  {
    accessorKey: 'published',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Published
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const published = row.getValue('published')
      return (
        <div className="flex items-center justify-center">
          {published ? (
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
      const county = row.original
      const dispatch = useAppDispatch()
      const { refetch } = useGetCountiesQuery()

      const handleDelete = useCallback((row: Row<CountyDataProps>) => {
        const county = row.original
        dispatch(setCounty(county))
        dispatch(setOpenDeleteModal(true))
      }, [])

      return (
        <DataTableRowActions row={row} enableDelete handleDelete={handleDelete}>
          <UpdateCountyForm
            buttonTitle={
              <div className="flex items-center justify-start">
                <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Edit
              </div>
            }
            county={county}
            refetch={refetch}
          />
        </DataTableRowActions>
      )
    },
  },
]
