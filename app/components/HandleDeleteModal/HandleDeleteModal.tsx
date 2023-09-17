'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog'
import { Trash } from 'lucide-react'

type DataObj = {
  [key: string]: any
  id: string | undefined
}

interface HandleDeleteModalProps<T> {
  data: T;
  deleteHandler: (id: string) => void
}

export default function HandleDeleteModal<T extends DataObj>({
  data,
  deleteHandler,
}: HandleDeleteModalProps<T>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full py-2 flex items-center justify-start border-gray-900 px-4 dark:border-gray-200">
        <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteHandler(data?.id as string)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
