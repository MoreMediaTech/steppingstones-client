"use client";

import { useRouter } from "next/navigation";

// components
import Loader from "@components/Loader";
import CreateSectionForm from "./section/create-section-form";
import AddLocalFeedForm from "./add-local-feed-form";
import PortalButton from "@components/PortalButton";
import Map from "@components/Map";
import Header from "@components/Header";

import useContentController from "../use-content-controller";
import { PartialLocalFeedContentSchemaProps } from "@models/LocalFeedContent";
import { PartialSectionSchemaProps, SectionType } from "@models/Section";

type Props = {
  location: string;
  contentId: string;
};

export default function Content({ location, contentId }: Props) {
  const router = useRouter();

  const { feedContent, isLoadingFeedContent } = useContentController(
    contentId,
    undefined,
  );
  const localFeedContent = feedContent?.localFeedContent?.map(
    (localFeed) => localFeed.name,
  );

  if (isLoadingFeedContent) {
    return (
      <div className="mx-auto flex h-[700px] max-w-screen-md items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <section className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <Header title={feedContent?.name as string} order={1} />
        <div className="flex w-full items-center gap-2">
          <CreateSectionForm
            btnTitle="Create Section"
            type="section"
            contentId={contentId}
          />
          <AddLocalFeedForm
            contentId={contentId}
            location={feedContent?.name as string}
          />
        </div>
      </section>

      <section className="w-full py-4">
        {feedContent ? (
          <div className="grid h-full w-full grid-cols-1 gap-4">
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
              {/* TODO: update array object name */}
              {feedContent.sections?.map((section) => {
                if (section.type === SectionType.ABOVE_THE_FOLD_CONTENT) {
                  return (
                    <>
                      <PortalButton
                        type="button"
                        color="primaryFilled"
                        isLive={section?.isLive}
                        onClick={() => {
                          router.push(
                            `/admin-portal/content-portal/${location}/section?contentId=${contentId}&sectionId=${section?.id}`,
                          );
                        }}
                      >
                        {section?.name}
                      </PortalButton>
                    </>
                  );
                }
              })}

              <div className="h-full w-full rounded  p-2 shadow-lg dark:shadow-gray-500 sm:col-span-3">
                <Map
                  location={`${feedContent.name}, UK`}
                  districtsArray={localFeedContent as string[]}
                />
              </div>
              <div className="h-full w-full space-y-4 sm:col-span-3">
                <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 ">
                  {feedContent?.localFeedContent?.map(
                    (content: PartialLocalFeedContentSchemaProps) => (
                      <PortalButton
                        key={content?.id}
                        type="button"
                        color="primaryFilled"
                        isLive={content?.isLive}
                        onClick={() =>
                          router.push(
                            `/admin-portal/content-portal/${location}/local-feed?contentId=${contentId}&localFeedContent=${content?.name}&localFeedContentId=${content?.id}`,
                          )
                        }
                      >
                        {content?.name}
                      </PortalButton>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-3">
                  {feedContent?.sections?.map(
                    (section: PartialSectionSchemaProps) => {
                      if (section.type === SectionType.FEED_SECTION) {
                        return (
                          <PortalButton
                            key={`${section?.id}`}
                            type="button"
                            color="primaryFilled"
                            isLive={section?.isLive}
                            onClick={() =>
                              router.push(
                                `/admin-portal/content-portal/${location}/section?contentId=${contentId}&section=${section.name}&sectionId=${section.id}`,
                              )
                            }
                          >
                            {section?.name}
                          </PortalButton>
                        );
                      }
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </section>
  );
}
