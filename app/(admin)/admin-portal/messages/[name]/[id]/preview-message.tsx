"use client";

import React from "react";

// components
import { Toolbar } from "@components/email/toolbar";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// hooks (Controller)
import useMessagesController from "../use-messages-controller";

// zod schemas
import { PartialMessageSchemaProps } from "@models/Messages";

// utils
import { formatEmailString } from "@lib/utils";
import { getRelativeTime } from "@lib/getRelativeTime";

export function MessagePreviewSection({ messageId, name }: { messageId: string; name: string }) {
  const [message, setMessage] = React.useState<PartialMessageSchemaProps>();
 

  const { handleGetMessageInFolder } = useMessagesController(
    undefined,
    messageId
  );

  const [windowSize] = useWindowSize();

  React.useEffect(() => {
    const getMessage = async () => {
      const messages = await handleGetMessageInFolder(name, messageId);
      setMessage(messages?.[0]?.message as PartialMessageSchemaProps);
    };
    getMessage();
  }, [messageId]);


  return (
    <section className="w-12/20 col-span-3 flex flex-col">
      <Toolbar />
      <div className="flex-grow space-y-4 overflow-y-auto p-4">
        <div className="border-b border-gray-200 pb-4 dark:border-gray-800 space-y-1">
          <h2 className="text-xl font-bold">{message?.subject}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            From: {message?.sender && formatEmailString(message?.sender)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">To: {message?.recipient?.email}</p>
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {message && getRelativeTime(message?.createdAt as string)}
          </time>
        </div>
        <div className="w-full px-4 py-2">
          <p className="text-sm font-semibold text-primary-dark-100 dark:text-primary-light-100">
            {message?.message}
          </p>
        </div>
      </div>
    </section>
  );
}
