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
    <div className="grid h-screen grid-cols-6 gap-2 p-2">
      <FolderColumn />
      <EmailListColumn folderName={params.name} />
      {children}
    </div>
  );
}
