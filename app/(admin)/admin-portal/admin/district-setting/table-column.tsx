'use client'
import { useCallback } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import Image from 'next/image'

import steppingstonesapplogo from '../../../../../public/steppingstonesapplogo.png'
import { DistrictDataProps } from '@lib/types'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { DataTableRowActions } from '@components/table/data-table-row-actions'
import { useAppDispatch } from 'app/global-state/hooks'
import {  setDistrict } from 'app/global-state/features/editor/editorSlice'
import {
  setOpenEditModal,
  setOpenDeleteModal,
  setOpenLASectionModal,
} from 'app/global-state/features/editor/editorSlice'
import { DropdownMenuItem } from '@components/ui/dropdown-menu'

export const columns: ColumnDef<DistrictDataProps>[] = [
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
            District Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
        const district = row.original
        return (
          <div className="flex items-center justify-start space-x-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary-dark-200 p-1">
              <Image
                src={district.logoIcon ?? steppingstonesapplogo}
                alt={district.name as string}
              />
            </div>
            <div className="text-xs font-semibold sm:text-base ">
              <p>{district?.name}</p>
            </div>
          </div>
        )
    },
  },
  { 
    accessorKey: 'county',
    header: ({ column }) => {
        return (
            <div className="flex items-center justify-start">
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                County
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    cell: ({ row }) => {
        const district = row.original
        return (
          <div className="flex items-center justify-start space-x-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#5E17EB] p-1">
              <Image
                src={district.county?.logoIcon ?? steppingstonesapplogo}
                alt={district.county?.name as string}
              />
            </div>
            <div className="text-xs font-semibold sm:text-base">
              <p>{district.county?.name}</p>
            </div>
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

      const handleOpenLASection = useCallback((row: Row<DistrictDataProps>) => {
        const district = row.original
        dispatch(setDistrict(district))
        dispatch(setOpenLASectionModal(true))
      }, [])

      const handleEdit = useCallback((row: Row<DistrictDataProps>) => {
        const district = row.original
        dispatch(setDistrict(district))
        dispatch(setOpenEditModal(true))
      }, [])
      const handleDelete = useCallback((row: Row<DistrictDataProps>) => {
        const district = row.original
        dispatch(setDistrict(district))
        dispatch(setOpenDeleteModal(true))
      }, [])

      return (
        <DataTableRowActions
          row={row}
          enableEdit
          enableDelete
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        >
          <DropdownMenuItem onClick={() => handleOpenLASection(row)}>
            Open LA Section
          </DropdownMenuItem>
        </DataTableRowActions>
      )
    },
  },
]
