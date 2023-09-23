"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader } from "@components/mantine-components";
import SectionContainer from "../../section/section-container";
import EconomicDataSection from "app/components/EconomicDataSection";
import CreateSectionForm from "../../section/create-section-form";

import { DistrictSectionProps } from "@lib/types";
import {
  useGetDistrictSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateDistrictSectionByIdMutation,
} from "app/global-state/features/editor/editorApiSlice";
import { Button } from "app/components/ui/button";
import Header from "@components/Header";
import { Badge } from "@components/ui/badge";

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

  const {
    data: laSectionData,
    isLoading: isLoadingSection,
    refetch: refetchSection,
  } = useGetDistrictSectionByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [opened, setOpened] = useState(false);
  const [type, setType] = useState<"create" | "edit">("create");
  const [createSubSection] = useCreateSubSectionMutation();
  const [updateDistrictSectionById, { isLoading }] =
    useUpdateDistrictSectionByIdMutation();

  return (
    <section className="space-y-2">
      <div className="flex flex-col-reverse items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <Header title={laSectionData?.name as string} order={1} />
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            color="outline"
            className="w-full md:w-1/4 "
            onClick={() => {
              router.push(
                `/admin-portal/county-portal/${county}/district?countyId=${countyId}&districtId=${districtId}&district=${district}&county=${county}`
              );
            }}
          >
            Go Back
          </Button>
          {laSectionData?.isEconomicData && (
            <Button
              type="button"
              color="outline"
              className="md:w-1/4 "
              onClick={() => {
                setOpened(true);
                setType("create");
              }}
            >
              Add Economic Data
            </Button>
          )}
          <CreateSectionForm
            createSection={createSubSection}
            refetch={refetchSection}
            id={laSectionData?.id as string}
          />
        </div>
      </div>
      {isLoadingSection ? (
        <div className="flex h-[700px] items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className="w-full overflow-auto px-2 py-2">
          <div className="flex justify-end px-2 md:px-4">
            {laSectionData?.isEconomicData && (
              <>
                {laSectionData.isLive ? (
                  <Badge>Live</Badge>
                ) : (
                  <Badge variant="destructive">Not Live</Badge>
                )}
              </>
            )}
          </div>
          {laSectionData?.isEconomicData ? (
            <section className="w-full overflow-auto px-2 py-24 md:px-4">
              <EconomicDataSection
                id={laSectionData?.id}
                opened={opened}
                setOpened={setOpened}
                type={type}
                setType={setType}
                isLoadingSection={isLoadingSection}
                refetch={refetchSection}
                economicDataWidgets={laSectionData?.economicDataWidgets}
              />
            </section>
          ) : (
            <SectionContainer
              isLoadingSection={isLoadingSection}
              sectionData={laSectionData as DistrictSectionProps}
              refetch={refetchSection}
              updateSectionById={updateDistrictSectionById}
              isLoading={isLoading}
            />
          )}
        </section>
      )}
    </section>
  );
}
