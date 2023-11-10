import { MessagePreviewSection } from "./MessagePreviewSection";

export default function Page({ params }: { params: { name: string; id: string } }) {
  return (
    <>
      <MessagePreviewSection messageId={params.id} name={params.name} />
    </>
  );
}
