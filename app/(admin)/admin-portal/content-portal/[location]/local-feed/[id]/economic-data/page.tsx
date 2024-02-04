import React from "react";
import { EconomicData } from "./economic-data";

type PageProps = {
  params: { location: string; id: string };
  searchParams: { contentId: string; localFeedContentId: string};
};

export default function Page({ params, searchParams }: PageProps) {
  return (
    <section>
      <EconomicData sectionId={searchParams.localFeedContentId} />
    </section>
  );
}
