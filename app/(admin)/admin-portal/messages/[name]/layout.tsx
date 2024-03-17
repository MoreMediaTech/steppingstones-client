import { EmailListColumn } from "@components/email/email-list-column";
import { FolderColumn } from "@components/email/folder-column";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RPsRRQilTDp
 */
export default function EmailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string; id: string };
}) {
  return (
    <div className="grid h-screen w-full grid-cols-6">
      <div className="h-full">
        <FolderColumn />
      </div>
      <div className="col-span-2 h-full">
        <EmailListColumn folderName={params.name} />
      </div>
      <div className="col-span-3 h-full">{children}</div>
    </div>
  );
}
