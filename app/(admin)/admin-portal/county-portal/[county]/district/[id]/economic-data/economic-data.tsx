"use client";

import { useRouter } from "next/navigation";

// components
import { Loader } from "@components/mantine-components";
import EconomicDataWidget from "./EconomicDataWidget";
import Header from "@components/Header";
import { Button } from "@components/ui/button";

import { cn } from "@lib/utils";

// zod schemas
import { PartialEconomicDataSchemaProps } from "@models/District";

// hooks (Controller)
import useEconomicDataController from "./use-economic-data-controller";
import { CreateEconomicData } from "./create-economic-data";

export function EconomicData({
  districtSectionId,
}: {
  districtSectionId: string;
}) {
  const router = useRouter();
  const { economicDataWidgets, isLoading } = useEconomicDataController(
    districtSectionId,
    undefined,
    undefined
  );

  if (isLoading) {
    return (
      <div className="flex h-[700px] w-full items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <section className="relative w-full px-2 py-2 md:container md:mx-auto md:h-screen  md:px-8 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <Header title={`Economic Data`} order={1} />
        <div className="w-full items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <CreateEconomicData districtSectionId={districtSectionId} />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4  text-xl md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {economicDataWidgets?.map(
          (economicData: PartialEconomicDataSchemaProps) => (
            <EconomicDataWidget
              key={economicData.id}
              economicData={economicData}
            />
          )
        )}
      </div>
    </section>
  );
}
