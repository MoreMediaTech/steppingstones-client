"use client";

import React from "react";
import Link from "next/link";

// utils
import { formatEmailString } from "@lib/utils";
import { getRelativeTime } from "@lib/getRelativeTime";

// hooks (Controller)
import useMessagesController from "@app/(admin)/admin-portal/messages/[name]/use-messages-controller";

// zod schemas
import { PartialUserWithIdType } from "@models/User";
import { MessageFolderProps } from "@models/Messages";

export function EmailListColumn({ folderName }: { folderName: string }) {
  const { handleGetMessagesForFolder } = useMessagesController();
  const [emails, setEmails] = React.useState<MessageFolderProps[]>([]);
  
  // capitalize first letter of folder name
  const updatedFolderName =
    folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase();

  React.useEffect(() => {
    const getMessages = async () => {
      const messages = await handleGetMessagesForFolder(updatedFolderName);
      setEmails(messages as MessageFolderProps[]);
    };
    getMessages();
  }, [updatedFolderName]);

  return (
    <div className="col-span-2 overflow-y-auto border-r border-gray-200 p-2 dark:border-gray-800">
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {emails
          .filter((email) => email.folder?.name === updatedFolderName)
          ?.map((email) => (
            <Link
              key={email?.id}
              href={`/admin-portal/messages/${folderName.toLowerCase()}/${email?.message.id?.toString()}`}
            >
              <li className="flex cursor-pointer items-start justify-between rounded-lg border-b p-4 hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="w-full truncate">
                  <h2 className="text-base font-bold">
                    {formatEmailString(
                      email?.message.sender as PartialUserWithIdType
                    )}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {email?.message.subject}
                  </p>
                  <p className="o verflow-ellipsis truncate text-sm">
                    {email?.message.message}
                  </p>
                </div>
                <time className="flex w-full justify-end self-center text-xs text-gray-500 dark:text-gray-400">
                  {getRelativeTime(email?.message.createdAt as string)}
                </time>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
