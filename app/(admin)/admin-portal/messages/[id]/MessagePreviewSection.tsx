"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { IoArrowUndoSharp } from "react-icons/io5";

// components
import { Loader } from "@components/mantine-components";

// hooks
import useWindowSize from "@hooks/useWindowSize";

// hooks (Controller)
import useMessagesController from "../use-messages-controller";

export function MessagePreviewSection({ messageId }: { messageId: string }) {
  const router = useRouter();
  
  const { message, isMessageLoading, handleDelete } = useMessagesController(
    undefined,
    messageId,
    undefined
  );

  const [windowSize] = useWindowSize();

  const handleBack = () => {
    router.back();
  };

  const handleReply = () => {
    router.push(`/admin-portal/messages/reply?id=${messageId}`);
  };

  if (isMessageLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }
  return (
    <>
      <section
        className="flex flex-col"
        style={{
          height: (windowSize?.innerHeight as number) - 150,
        }}
      >
        <div className="relative  flex w-full items-center justify-between border-b border-primary-dark-100 py-2">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleBack}
              className="border-r border-primary-dark-100 px-4 py-2 text-xl font-semibold"
            >
              <AiOutlineArrowLeft
                fontSize={30}
                fontWeight={500}
                className="text-primary-dark-100 hover:text-primary-light-600 dark:text-primary-light-100"
              />
            </button>
            <div className="px-4 py-2 dark:text-primary-light-100">
              <p className="text-xl font-semibold text-primary-dark-100 dark:text-primary-light-100">
                {message &&
                  format(
                    new Date(message?.createdAt as string),
                    "MM/dd/yyyy HH:MM",
                    {
                      locale: enGB,
                    }
                  )}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="border-r border-primary-dark-100 px-4 py-2 text-xl font-semibold"
              onClick={handleReply}
            >
              <IoArrowUndoSharp
                fontSize={30}
                className="text-primary-dark-100 hover:text-primary-light-600 dark:text-primary-light-100"
              />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(messageId)}
              className="px-4 py-2"
            >
              <FaTrash fontSize={30} className="text-red-500" />
            </button>
          </div>
        </div>
        <div className="relative col-span-2 flex w-full flex-grow  flex-col ">
          <div className="w-full px-4 py-2">
            <h2 className="text-sm font-semibold text-primary-dark-100 dark:text-primary-light-100">
              from: {message?.from}
            </h2>
            <p className="text-lg font-semibold text-primary-dark-100 dark:text-primary-light-100">
              Subject: {message?.subject}
            </p>
          </div>
          <div className="w-full px-4 py-2">
            <p className="text-sm font-semibold text-primary-dark-100 dark:text-primary-light-100">
              {message?.message}
            </p>
          </div>
        </div>
      </section>
      <section className="bottom-0 left-0 block p-2">
        <button
          type="button"
          className="rounded bg-tertiary-500 px-4 py-2 text-white shadow"
          onClick={handleReply}
        >
          <p>Reply</p>
        </button>
      </section>
    </>
  );
}
