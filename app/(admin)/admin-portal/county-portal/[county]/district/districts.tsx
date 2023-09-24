"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

// components
import { Loader } from "@components/mantine-components";
import { CreateLASectionForm } from "./create-district-section-form";
import PortalButton from "@components/PortalButton";
import Map from "@components/Map";
import Header from "@components/Header";
import { Button } from "@components/ui/button";

// hooks (Controller)
import useDistrictController from "./use-district-controller";

// zod schemas
import { DistrictSectionSchemaProps } from "@models/District";

type Props = {
  searchParams: {
    county: string;
    countyId: string;
    district: string;
    districtId: string;
  };
};

export default function Districts({ searchParams }: Props) {
  const router = useRouter();

  const { district, isLoadingDistrict } = useDistrictController(
    searchParams.districtId,
    undefined,
    undefined
  );

  if (isLoadingDistrict) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <section className="flex flex-col-reverse  items-center justify-between gap-2 sm:flex-row md:px-4 md:py-8">
        <Header title={searchParams.district} order={1} />
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            type="button"
            onClick={() => router.back()}
            className="w-full"
          >
            Go Back
          </Button>
          <CreateLASectionForm id={district?.id as string} />
        </div>
      </section>

      <section className="w-full px-2 py-4">
        <div className="grid h-full w-full grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="h-full rounded  p-2 shadow-md md:col-span-2">
            <Suspense fallback={<Loader size="xl" variant="bars" />}>
              <Map location={`${searchParams.district}, UK`} />
            </Suspense>
          </div>
          <div className="mb-2 w-full md:col-span-2">
            <div className="grid w-full grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
              {district?.districtSections?.map(
                (section: DistrictSectionSchemaProps) => {
                  if (section.name === "Economic Data") {
                    return (
                      <PortalButton
                        key={`${section.id}`}
                        type="button"
                        color="primaryFilled"
                        isLive={section.isLive}
                        onClick={() =>
                          router.push(
                            `/admin-portal/county-portal/${searchParams.county}/district/${section.id}/economic-data?countyId=${searchParams.countyId}&districtId=${searchParams.districtId}&district=${searchParams.district}`
                          )
                        }
                      >
                        {section.name}
                      </PortalButton>
                    );
                  }
                  return (
                    <PortalButton
                      key={`${section.id}`}
                      type="button"
                      color="primaryFilled"
                      isLive={section.isLive}
                      onClick={() =>
                        router.push(
                          `/admin-portal/county-portal/${searchParams.county}/district/${section.id}?&countyId=${searchParams.countyId}&district=${searchParams.district}&districtId=${searchParams.districtId}`
                        )
                      }
                    >
                      {section.name}
                    </PortalButton>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
