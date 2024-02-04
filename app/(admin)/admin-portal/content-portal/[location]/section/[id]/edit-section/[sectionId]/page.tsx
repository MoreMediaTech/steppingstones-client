import React from "react";
import EditSection from "./edit-section";

type PageProps = {
  params: { location: string; id: string, sectionId: string };
};
export default function Page({ params }: PageProps) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <EditSection sectionId={params.sectionId} />
    </section>
  );
}
