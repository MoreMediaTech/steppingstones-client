"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// components
import { ArrowLeftIcon } from "@app/icons/arrow-left";
import { ArrowRightIcon } from "@app/icons/arrow-right";
import { EmailIcon } from "@app/icons/email";
import { SearchIcon } from "@app/icons/search";
import { TrashIcon } from "@app/icons/trash";
import { Button } from "@components/ui/button";

import useMessagesController from "@app/(admin)/admin-portal/messages/[name]/use-messages-controller";

type Params = {
  name: string;
  id: string;
};

export function Toolbar() {
  const params: Params = useParams();

  const { handleDelete } = useMessagesController();

  return (
    <div className="sticky top-0 flex h-[60px] items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
      <div className="space-x-6">
        <Link href={`/admin-portal/messages/${params.name}/new`} className="inline-flex">
          <EmailIcon />
        </Link>
        <form
          className="inline-flex"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleDelete(params.id);
          }}
        >
          <Button type="submit">
            <TrashIcon />
          </Button>
        </form>
        <Button variant="ghost">
          <ArrowLeftIcon />
        </Button>
        <Button variant="ghost">
          <ArrowRightIcon />
        </Button>
      </div>
      <Button variant="ghost" className="ml-auto flex">
        <SearchIcon />
      </Button>
    </div>
  );
}
