"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

// components
import Loader from "@components/Loader";
import { CreateLocalFeedSectionForm} from "./create-local-feed-form";
import PortalButton from "@components/PortalButton";
import Map from "@components/Map";
import Header from "@components/Header";
import { Button } from "@components/ui/button";

// hooks (Controller)
import useLocalFeedController from "./use-local-feed-controller";

// zod schemas
import { PartialSectionSchemaProps } from "@models/Section";

type Props = {
  searchParams: {
    location: string;
    contentId: string;
    localFeedContent: string;
    localFeedContentId: string;
  };
};

export default function Content({ searchParams }: Props) {
  const router = useRouter();

  const { localFeedContent, isLoadingLocalFeedContent } = useLocalFeedController(
    searchParams.localFeedContentId,
    undefined,
    undefined,
  );

  if (isLoadingLocalFeedContent) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <section className="flex flex-col-reverse  items-center justify-between gap-2 sm:flex-row md:px-4 md:py-8">
        <Header title={localFeedContent?.name as string} order={1} />
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            type="button"
            onClick={() => router.back()}
            className="w-full"
          >
            Go Back
          </Button>
          <CreateLocalFeedSectionForm id={localFeedContent?.id as string} />
        </div>
      </section>

      <section className="w-full px-2 py-4">
        <div className="grid h-full w-full grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="h-full rounded  p-2 shadow-md md:col-span-2">
            <Suspense fallback={<Loader />}>
              <Map location={`${localFeedContent?.name}, UK`} />
            </Suspense>
          </div>
          <div className="mb-2 w-full md:col-span-2">
            <div className="grid w-full grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
              {localFeedContent?.sections?.map(
                (section: PartialSectionSchemaProps) => {
                  if (section.name === "Economic Data") {
                    return (
                      <PortalButton
                        key={`${section.id}`}
                        type="button"
                        color="primaryFilled"
                        isLive={section.isLive}
                        onClick={() =>
                          router.push(
                            `/admin-portal/content-portal/${searchParams.location}/local-feed/${section.id}/economic-data?contentId=${searchParams.contentId}&localFeedContentId=${searchParams.localFeedContentId}`,
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
                          `/admin-portal/content-portal/${searchParams.location}/local-feed/${section.id}?&contentId=${searchParams.contentId}&localFeedContent=${searchParams.localFeedContent}&localFeedContentId=${searchParams.localFeedContentId}`,
                        )
                      }
                    >
                      {section.name}
                    </PortalButton>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
