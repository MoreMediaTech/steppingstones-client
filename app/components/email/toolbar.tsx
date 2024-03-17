"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaFolderPlus } from "react-icons/fa";

// components
import { ArrowLeftIcon } from "@app/icons/arrow-left";
import { ArrowRightIcon } from "@app/icons/arrow-right";
import { EmailIcon } from "@app/icons/email";
import { SearchIcon } from "@app/icons/search";
import { TrashIcon } from "@app/icons/trash";
import { Button } from "@components/ui/button";

import useMessagesController from "@app/(admin)/admin-portal/messages/[name]/use-messages-controller";
import CreateFolderModal from "./create-folder-modal";

type Params = {
  name: string;
  id: string;
};

export function Toolbar() {
  const params: Params = useParams();

  const { handleDelete } = useMessagesController();

  return (
    <div className="sticky top-0 flex h-[60px] items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
      <div className="w-1/2 space-x-6">
        <Link
          href={`/admin-portal/messages/${params.name}/new`}
          className="inline-flex"
        >
          <EmailIcon />
        </Link>
        <form
          className="inline-flex"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleDelete(params.id);
          }}
        >
          <Button variant="ghost" type="submit">
            <TrashIcon />
          </Button>
        </form>
        <CreateFolderModal />
        <Button variant="ghost" asChild>
          <Link
            href={`/admin-portal/messages/${params.name}/reply?id=${params.id}`}
            className="inline-flex"
          >
            <ArrowLeftIcon />
          </Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link
            href={`/admin-portal/messages/${params.name}/forward?id=${params.id}`}
            className="inline-flex"
          >
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
      <Button variant="ghost" className="ml-auto flex">
        <SearchIcon />
      </Button>
    </div>
  );
}
