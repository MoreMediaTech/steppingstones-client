"use client";

import { useRouter } from "next/navigation";

// components
import { Loader } from "@components/mantine-components";
import CreateSectionForm from "./section/create-section-form";
import AddDistrictForm from "./AddDistrictForm";
import PortalButton from "@components/PortalButton";
import Map from "@components/Map";
import Header from "@components/Header";

import { DistrictDataProps, SectionProps } from "@lib/types";
import {
  useGetCountyByIdQuery,
} from "@global-state/features/editor/editorApiSlice";

type Props = {
  county: string;
  countyId: string;
};

export default function County({ county, countyId }: Props) {
  const router = useRouter();

  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(countyId, {
    refetchOnMountOrArgChange: true,
  });

  const districts = countyData?.districts.map((district) => district.name);

  return (
    <section className="space-y-2">
      <section className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <Header title={countyData?.name as string} order={1} />
        <div className="flex w-full items-center gap-2">
          <CreateSectionForm
            btnTitle="Create Section"
            type="section"
            id={countyId}
          />
          <AddDistrictForm
            countyId={countyId}
            county={countyData?.name as string}
            refetch={refetchCounty}
          />
        </div>
      </section>
      {isLoadingCounty ? (
        <div className="mx-auto flex h-[700px] max-w-screen-md items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className="w-full py-4">
          {countyData && (
            <div className="grid h-full w-full grid-cols-1 gap-4">
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                <PortalButton
                  type="button"
                  color="primaryFilled"
                  isLive={countyData.welcome?.isLive}
                  onClick={() => {
                    router.push(
                      `/admin-portal/county-portal/${county}/welcome?countyId=${countyId}&county=${county}`
                    );
                  }}
                >
                  Welcome
                </PortalButton>
                <PortalButton
                  type="button"
                  color="primaryFilled"
                  isLive={countyData.lep?.isLive}
                  onClick={() => {
                    router.push(
                      `/admin-portal/county-portal/${county}/lep?countyId=${countyId}&county=${county}`
                    );
                  }}
                >
                  LEP
                </PortalButton>
                <PortalButton
                  type="button"
                  color="primaryFilled"
                  isLive={countyData.news?.isLive}
                  onClick={() => {
                    router.push(
                      `/admin-portal/county-portal/${county}/news?countyId=${countyId}&county=${county}`
                    );
                  }}
                >
                  NEWS
                </PortalButton>
              </div>
              <div className="h-full rounded  p-2 shadow-lg dark:shadow-gray-500 lg:col-span-2">
                <Map
                  location={`${county}, UK`}
                  districtsArray={districts as string[]}
                />
              </div>
              <div className="h-full w-full space-y-4 lg:col-span-2">
                <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 ">
                  {countyData?.districts?.map((district: DistrictDataProps) => (
                    <PortalButton
                      key={district?.id}
                      type="button"
                      color="primaryFilled"
                      isLive={district?.isLive}
                      onClick={() =>
                        router.push(
                          `/admin-portal/county-portal/${county}/district?countyId=${countyId}&county=${county}&district=${district?.name}&districtId=${district?.id}`
                        )
                      }
                    >
                      {district?.name}
                    </PortalButton>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-3">
                  {countyData?.sections?.map((section: SectionProps) => (
                    <PortalButton
                      key={`${section?.id}`}
                      type="button"
                      color="primaryFilled"
                      isLive={section?.isLive}
                      onClick={() =>
                        router.push(
                          `/admin-portal/county-portal/${county}/section?countyId=${countyId}&county=${county}&section=${section.name}&sectionId=${section.id}`
                        )
                      }
                    >
                      {section?.name}
                    </PortalButton>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </section>
  );
}
