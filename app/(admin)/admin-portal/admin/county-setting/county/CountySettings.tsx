"use client";

import Loader from "@components/Loader";
import { CountyTable } from "./CountyTable";

// hooks (Controller)
import useCountySettingController from "./use-county-setting-controller";
import { CountySchemaProps } from "@models/County";

export function CountySettings() {
  const { counties, isLoadingCounties } = useCountySettingController();

  if (isLoadingCounties) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <section>
      <CountyTable countyData={counties as CountySchemaProps[]} />
    </section>
  );
}
