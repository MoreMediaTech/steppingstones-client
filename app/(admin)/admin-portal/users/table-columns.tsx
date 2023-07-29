'use client'
import { ColumnDef, Row } from '@tanstack/react-table'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { Checkbox } from '@components/ui/checkbox'
import { useGetUsersQuery } from 'app/global-state/features/user/usersApiSlice'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'
import { UpdateUserForm } from './UpdateUserForm'

export const columns: ColumnDef<UserSchemaWithIdAndOrganisationType>[] = [
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
      const user = row.original
      const { refetch } = useGetUsersQuery()

      return (
        <UpdateUserForm user={user}refetch={refetch}/>
      )
    },
  },
]
