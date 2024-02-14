"use client";

import { useRouter } from "next/navigation";

// components
import Loader from "@components/Loader";
import { SectionContainer } from "../../section/section-container";

import { Button } from "@components/ui/button";
import Header from "@components/Header";

// hooks (Controller)
import useLocalFeedController from "../use-local-feed-controller";

// zod schemas
import { PartialSectionSchemaProps } from "@models/Section";

type Props = {
  id: string;
  location: string;
  contentId: string;
  localFeedContent: string;
  localFeedContentId: string;
};

export default function Content({
  id,
  location,
  contentId,
  localFeedContent,
  localFeedContentId,
}: Props) {
  const router = useRouter();

  const { section, isLoadingSection } = useLocalFeedController(
    localFeedContentId,
    id,
    undefined,
  );

  if (isLoadingSection) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <div className="flex flex-col-reverse items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <Header title={section?.name as string} order={1} />
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            color="outline"
            className="w-full md:w-1/4 "
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>

      <section className="w-full overflow-auto px-2 py-2">
        <SectionContainer
          data={section as PartialSectionSchemaProps}
          href={`/admin-portal/content-portal/${location}/local-feed/${localFeedContentId}/edit-content/${section?.id}`}
        />
      </section>
    </section>
  );
}
