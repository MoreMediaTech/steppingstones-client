"use client";

// components
import { Loader } from "@components/mantine-components";
import EconomicDataWidget from "./EconomicDataWidget";
import Header from "@components/Header";

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
  const { economicDataWidgets, isLoading } = useEconomicDataController(
    districtSectionId,
    undefined,
    undefined
  );

  if (isLoading) {
    return (
      <div className="flex w-full h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <section className="relative md:h-screen w-full md:container md:mx-auto px-2 py-2  md:px-8 md:py-8">
      <div className="flex items-center justify-center mb-6">
        <Header title={`Economic Data`} order={1} />
        <CreateEconomicData districtSectionId={districtSectionId} />
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
