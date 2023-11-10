"use client";

import Link from "next/link";

// components
import { FlagIcon } from "@app/icons/flag";
import { FolderIcon } from "@app/icons/folder";
import { InboxIcon } from "@app/icons/inbox";
import { SentIcon } from "@app/icons/sent";

// hooks (Controller)
import useMessagesController from "@app/(admin)/admin-portal/messages/[name]/use-messages-controller";

export async function FolderColumn() {
  const { folders } = useMessagesController();

  return (
    <div className="space-y-2 overflow-y-auto border-r border-gray-200 p-2 dark:border-gray-800">
      <ul>
        {folders?.specialFolders.map((folder, index) => (
          <Link
            key={index}
            href={`/admin-portal/messages/${encodeURIComponent(
              (folder.name as string).toLowerCase()
            )}`}
          >
            <li className="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex items-center space-x-3">
                {folder.name === "Inbox" ? (
                  <InboxIcon />
                ) : folder.name === "Flagged" ? (
                  <FlagIcon />
                ) : (
                  <SentIcon />
                )}
                <span className="text-sm">{folder.name}</span>
              </div>
              <span className="flex w-6 justify-center rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                {folder.message_count}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <hr className="my-4 border-gray-200 dark:border-gray-800" />
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {folders?.otherFolders.map((folder, index) => (
          <Link
            key={index}
            href={`/admin-portal/messages/${encodeURIComponent(
              (folder.name as string).toLowerCase()
            )}`}
          >
            <li className="flex cursor-pointer items-center justify-between space-x-3 rounded-lg px-3 py-4 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex items-center space-x-3">
                <FolderIcon />
                <span className="text-sm">{folder.name}</span>
              </div>
              <span className="flex w-6 justify-center rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                {folder.message_count}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
