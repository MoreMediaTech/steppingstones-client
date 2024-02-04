"use client";
import { useRouter } from "next/navigation";

import Loader from "@components/Loader";
import { SectionContainer } from "../section-container";
import { Button } from "@components/ui/button";
import Header from "@components/Header";

import useSectionController from "../use-section-controller";
import { PartialSectionSchemaProps } from "@models/Section";

type Props = {
  params: { location: string; id: string };
  searchParams: {
    location: string;
    contentId: string;
    sectionId: string;
  };
};

export default function SubSection({params, searchParams }: Props) {
  const router = useRouter();

  const { section, isLoadingSection } = useSectionController(
    params.id,
    undefined,
    undefined
  );

  const handleClick = () => {
    router.push(
      `/admin-portal/content-portal/${params.location}/section/${params.id}/edit-section/${section?.id}`
    );
  };
  return (
    <>
      <section className="space-y-2">
        <div className="flex flex-col items-center  justify-between sm:flex-row">
          <Header title={section?.name as string} order={1} />
          <div className="flex items-center gap-2 sm:w-1/3">
            <Button
              type="button"
              className="w-1/3 sm:w-full "
              onClick={() => {
                router.push(
                  `/admin-portal/content-portal/${params.location}/section?contentId=${searchParams.contentId}&sectionId=${searchParams.sectionId}`
                );
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader className="h-12 w-12" />
          </div>
        ) : (
          <section className="w-full overflow-auto">
            <SectionContainer
              data={section as PartialSectionSchemaProps}
              onClick={handleClick}
            />
          </section>
        )}
      </section>
    </>
  );
}
