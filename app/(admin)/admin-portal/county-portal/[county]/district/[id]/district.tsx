"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// components
import { Loader } from "@components/mantine-components";
import { SectionContainer } from "../../section/section-container";

import { Button } from "@components/ui/button";
import Header from "@components/Header";
import { Badge } from "@components/ui/badge";

// hooks (Controller)
import useDistrictController from "../use-district-controller";

// zod schemas
import { PartialDistrictSectionSchemaProps } from "@models/District";

type Props = {
  id: string;
  county: string;
  countyId: string;
  district: string;
  districtId: string;
};

export default function District({
  id,
  county,
  countyId,
  district,
  districtId,
}: Props) {
  const router = useRouter();

  const { districtSection, isLoadingDistrictSection } = useDistrictController(
    districtId,
    id,
    undefined
  );

  if (isLoadingDistrictSection) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <div className="flex flex-col-reverse items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <Header title={districtSection?.name as string} order={1} />
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            color="outline"
            className="w-full md:w-1/4 "
            onClick={() => {
              router.push(
                `/admin-portal/county-portal/${county}/district?countyId=${countyId}&districtId=${districtId}&district=${district}`
              );
            }}
          >
            Go Back
          </Button>
        </div>
      </div>

      <section className="w-full overflow-auto px-2 py-2">
        <SectionContainer
          data={districtSection as PartialDistrictSectionSchemaProps}
        />
      </section>
    </section>
  );
}
