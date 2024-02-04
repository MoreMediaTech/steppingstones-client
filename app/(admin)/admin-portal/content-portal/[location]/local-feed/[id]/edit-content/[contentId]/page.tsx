import React from "react";
import EditContent from "./edit-content";

type PageProps = {
  params: { location: string; id: string; contentId: string; };
};
export default function Page({ params }: PageProps) {
  return (
    <section>
      <EditContent sectionId={params.contentId} />
    </section>
  );
}
