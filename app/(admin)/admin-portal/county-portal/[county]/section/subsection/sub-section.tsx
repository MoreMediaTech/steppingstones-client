"use client";
import { useRouter } from "next/navigation";

import Loader from "@components/Loader";
import { SectionContainer } from "../section-container";
import { Button } from "@components/ui/button";
import Header from "@components/Header";

import useSectionController from "../use-section-controller";
import { PartialSectionSchemaProps } from "@models/Section";

type Props = {
  searchParams: {
    county: string;
    countyId: string;
    sectionId: string;
    subSectionId: string;
  };
};

export default function SubSection({ searchParams }: Props) {
  const router = useRouter();

  const { subSectionData, isLoadingSubSection } = useSectionController(
    undefined,
    searchParams.subSectionId,
    "subsection"
  );

  const handleClick = () => {
    router.push(
      `/admin-portal/county-portal/${searchParams.county}/section/subsection/${searchParams.subSectionId}`
    );
  };
  return (
    <>
      <section className="space-y-2">
        <div className="flex flex-col items-center  justify-between sm:flex-row">
          <Header title={subSectionData?.title as string} order={1} />
          <div className="flex items-center gap-2 sm:w-1/3">
            <Button
              type="button"
              className="w-1/3 sm:w-full "
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${searchParams.county}/section?countyId=${searchParams.countyId}&sectionId=${searchParams.sectionId}`
                );
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
        {isLoadingSubSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader className="h-12 w-12" />
          </div>
        ) : (
          <section className="w-full overflow-auto">
            <SectionContainer
              data={subSectionData as PartialSectionSchemaProps}
              onClick={handleClick}
            />
          </section>
        )}
      </section>
    </>
  );
}
