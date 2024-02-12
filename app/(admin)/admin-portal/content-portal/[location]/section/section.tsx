"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import CreateSectionForm from "./create-section-form";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { SectionContainer } from "./section-container";
import PortalButton from "@components/PortalButton";
import Header from "@components/Header";
import Loader from "@components/Loader";

// hooks (Controller)
import useSectionController from "./use-section-controller";

// zod schemas
import { PartialSectionSchemaProps } from "@models/Section";

type SectionProps = {
  location: string;
  contentId: string;
  sectionId: string;
};

export default function Section({
  location,
  contentId,
  sectionId,
}: SectionProps) {
  const router = useRouter();

  const { section, subSectionData, isLoadingSection } = useSectionController(
    sectionId,
    undefined,
    sectionId,
  );

  return (
    <>
      <section className="space-y-2">
        <div className="my-4 flex w-full flex-col-reverse  items-center justify-between sm:flex-row">
          <div className="flex items-center justify-start gap-2 sm:w-1/2 ">
            <Header title={section?.name as string} order={1} />
            {section?.isSubSection && (
              <>
                {section?.isLive ? (
                  <Badge>Live</Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="flex w-[90px] items-center justify-center"
                  >
                    Not Live
                  </Badge>
                )}
              </>
            )}
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2 sm:w-1/3 sm:justify-end">
            <Button
              type="button"
              className="w-1/3 border-primary sm:w-full"
              onClick={() => router.back()}
            >
              Go Back
            </Button>

            {section?.isSubSection && (
              <CreateSectionForm
                btnTitle="Create Subsection"
                type="section"
                parentId={sectionId}
              />
            )}
          </div>
        </div>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader className="h-12 w-12" />
          </div>
        ) : (
          <section className="w-full overflow-auto ">
            {section?.isSubSection ? (
              <section className=" w-full overflow-auto md:py-24">
                {subSectionData ? (
                  <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {subSectionData?.map(
                      (section: PartialSectionSchemaProps) => (
                        <Link
                          href={`/admin-portal/content-portal/${location}/section/${section?.id}?contentId=${contentId}&sectionId=${sectionId}&subSectionId=${section.id}`}
                          key={`${section?.id}`}
                        >
                          <PortalButton
                            type="button"
                            color="primaryFilled"
                            isLive={section?.isLive}
                          >
                            {section?.name}
                          </PortalButton>
                        </Link>
                      ),
                    )}
                  </div>
                ) : null}
              </section>
            ) : (
              <SectionContainer
                data={section as PartialSectionSchemaProps}
                href={`/admin-portal/content-portal/${location}/section/${sectionId}`}
              />
            )}
          </section>
        )}
      </section>
    </>
  );
}
