'use client'
import { useCallback } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { CurrentUser } from '@lib/types'
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { Checkbox } from '@components/ui/checkbox'
import { DataTableRowActions } from '@components/table/data-table-row-actions'
import { useAppDispatch } from 'app/global-state/hooks'
import { setUser } from 'app/global-state/features/user/userSlice'
import { setOpenModal } from 'app/global-state/features/global/globalSlice'

export const columns: ColumnDef<CurrentUser>[] = [
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'organisation',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Organisation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const organisation = row.original.organisation
      return (
        <div className="flex items-center justify-start">
          {organisation?.name}
        </div>
      )
    },
  },
  {
    accessorKey: 'county',
    header: 'County',
  },
  {
    accessorKey: 'isAdmin',
    header: 'Admin',
    cell: ({ row }) => {
      const isAdmin = row.getValue('isAdmin')
      return (
        <div className="flex items-center justify-center">
          {isAdmin ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'acceptTermsAndConditions',
    header: 'Accept T & C',
    cell: ({ row }) => {
      const acceptTermsAndConditions = row.getValue('acceptTermsAndConditions')
      return (
        <div className="flex items-center justify-center">
          {acceptTermsAndConditions ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
    cell: ({ row }) => {
      const emailVerified = row.getValue('emailVerified')
      return (
        <div className="flex items-center justify-center">
          {emailVerified ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </div>
      )
    },
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const dispatch = useAppDispatch()

      const handleEdit = useCallback((row: Row<CurrentUser>) => {
        const user = row.original
        dispatch(setUser(user))
        dispatch(setOpenModal(true))
      }, [])

      return (
        <DataTableRowActions row={row} enableEdit handleEdit={handleEdit} />
      )
    },
  },
]
