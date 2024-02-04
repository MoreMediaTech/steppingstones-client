"use client";

import Loader from "@components/Loader";
import { CountyTable } from "./feed-content-table";

// hooks (Controller)
import useFeedSettingController from "./use-feed-content-setting-controller";
import { FeedContentSchemaProps } from "@models/FeedContent";

export function FeedContentSettings() {
  const { feedContent, isLoadingFeedContent } = useFeedSettingController();

  if (isLoadingFeedContent) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <section>
      <CountyTable countyData={feedContent as FeedContentSchemaProps[]} />
    </section>
  );
}
