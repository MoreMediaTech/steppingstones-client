"use client";

// zod schema
import { PartialLocalFeedContentSchemaProps } from "@models/LocalFeedContent";

// components
import { DistrictTable } from "./local-feed-table";
import Loader from "@components/Loader";

// hooks (Controller)
import useDistrictSettingController from "./use-local-feed-setting-controller";

export function LocalFeedSettings() {
  const { localFeedData, isLoadingLocalFeed } = useDistrictSettingController();

  if (isLoadingLocalFeed) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <>
      <DistrictTable localFeedData={localFeedData as PartialLocalFeedContentSchemaProps[]} />
    </>
  );
}
