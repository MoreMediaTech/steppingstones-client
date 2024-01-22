"use client";

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
} from "@components/ui/alert-dialog";
import { Trash } from "lucide-react";

// lib
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";

type DataObj = {
  [key: string]: any;
  id: string | undefined;
};

interface HandleDeleteModalProps<T> {
  data: T;
  className?: string;
  deleteHandler: (id: string) => void;
}

export default function HandleDeleteModal<T extends DataObj>({
  data,
  className,
  deleteHandler,
}: HandleDeleteModalProps<T>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className={cn(
          `flex items-center justify-start border-gray-900 px-4 py-2 dark:border-gray-200`,
          className,
        )}
      >
        <Button variant={'outline'}>
          <Trash className="mr-2 h-3.5 w-3.5" />
          Delete
        </Button>
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
          <AlertDialogAction onClick={() => deleteHandler(data?.id as string)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
