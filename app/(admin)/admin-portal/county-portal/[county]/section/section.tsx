"use client";
import { useRouter } from "next/navigation";
import { Loader } from "@components/mantine-components";

// components
import CreateSectionForm from "./create-section-form";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { SectionContainer } from "./section-container";
import PortalButton from "@components/PortalButton";
import Header from "@components/Header";

// hooks (Controller)
import useSectionController from "./use-section-controller";

// zod schemas
import { PartialSectionSchemaProps, SectionSchemaProps } from "@models/Section";

type SectionProps = {
  county: string;
  countyId: string;
  sectionId: string;
};

export default function Section({ county, countyId, sectionId }: SectionProps) {
  const router = useRouter();

  const { sectionData, isLoadingSection } = useSectionController(sectionId);

  const handleClick = () => {
    router.push(`/admin-portal/county-portal/${county}/section/${sectionId}`);
  };

  return (
    <>
      <section className="space-y-2">
        <div className="my-4 flex w-full flex-col-reverse  items-center justify-between sm:flex-row">
          <div className="flex items-center justify-start gap-2">
            <Header title={sectionData?.name as string} order={1} />
            {sectionData?.isSubSection && (
              <>
                {sectionData?.isLive ? (
                  <Badge>Live</Badge>
                ) : (
                  <Badge variant="destructive">Not Live</Badge>
                )}
              </>
            )}
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2 sm:w-1/3 sm:justify-end">
            <Button
              type="button"
              className="w-1/3 border-gray-900 dark:border-gray-200 sm:w-full"
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${county}?countyId=${countyId}&county=${county}`
                );
              }}
            >
              Go Back
            </Button>

            {sectionData?.isSubSection && (
              <CreateSectionForm btnTitle="Create Subsection" type="section" id={sectionId} />
            )}
          </div>
        </div>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto ">
            {sectionData?.isSubSection ? (
              <section className=" w-full overflow-auto md:py-24">
                {sectionData && (
                  <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {sectionData?.subsections?.map(
                      (section: SectionSchemaProps) => (
                        <PortalButton
                          key={`${section.id}`}
                          type="button"
                          color="primaryFilled"
                          isLive={section?.isLive}
                          onClick={() =>
                            router.push(
                              `/admin-portal/county-portal/${county}/section/subsection?countyId=${countyId}&county=${county}&sectionId=${sectionId}&subSectionId=${section.id}`
                            )
                          }
                        >
                          {section?.name}
                        </PortalButton>
                      )
                    )}
                  </div>
                )}
              </section>
            ) : (
              <SectionContainer
                data={sectionData as PartialSectionSchemaProps}
                onClick={handleClick}
              />
            )}
          </section>
        )}
      </section>
    </>
  );
}
