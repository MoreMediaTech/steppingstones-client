import { MessagePreviewSection } from "./preview-message";

export default function Page({ params }: { params: { name: string; id: string } }) {
  return (
    <>
      <MessagePreviewSection messageId={params.id} name={params.name} />
    </>
  );
}
