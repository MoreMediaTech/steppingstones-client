'use client'

import { Row } from '@tanstack/react-table'
import { MoreHorizontal, Pen, Trash } from 'lucide-react'

import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  enableDelete?: boolean
  enableEdit?: boolean
  handleDelete?: (row: Row<TData>) => void
  handleEdit?: (row: Row<TData>) => void
}

export function DataTableRowActions<TData>({
  row,
  enableDelete = false,
  enableEdit = false,
  handleDelete,
  handleEdit,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {enableEdit ? (
          <DropdownMenuItem onClick={() => handleEdit!(row)}>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        {enableDelete ? (
          <DropdownMenuItem onClick={() => handleDelete!(row)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
