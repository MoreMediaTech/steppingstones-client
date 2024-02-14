"use client";

import React from "react";
import { useRouter } from "next/navigation";

// hooks
import { useContentForm } from "@hooks/useContentForm";

// hooks (Controller)
import useLocalFeedController from "../../../use-local-feed-controller";

// components
import { ContentForm } from "@components/forms";
import Loader from "@components/Loader";
import { Button } from "@components/ui/button";
import Header from "@components/Header";
import { ScrollArea } from "@components/ui/scroll-area";

type EditSectionProps = {
  sectionId: string;
};

export default function EditContent({ sectionId }: EditSectionProps) {
  const router = useRouter();
  const {
    section,
    isLoadingSection,
    isUpdatingSection,
    updateSectionById,
    refetchSection,
  } = useLocalFeedController(undefined, sectionId, undefined);

  const defaultValues = {
    title: section?.title ? (section?.title as string) : "",
    isLive: section?.isLive ? (section?.isLive as boolean) : false,
    content: section?.content ? (section?.content as string) : "",
    author: section?.author ? (section?.author as string) : "",
    summary: section?.summary ? (section?.summary as string) : "",
    imageFile: undefined,
    videoUrl: section?.videoUrl ? (section?.videoUrl as string) : "",
    videoTitle: section?.videoTitle ? (section?.videoTitle as string) : "",
    videoDescription: section?.videoDescription
      ? (section?.videoDescription as string)
      : "",
    id: section?.id ? (section?.id as string) : "",
  };
  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        defaultValues,
        updateOrCreate: updateSectionById,
      },
      refetchSection,
    );

  React.useEffect(() => {
    // reset the form when the county data is changed/updated
    form.reset({ ...defaultValues });
  }, [section]);

  if (isLoadingSection) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <section className="h-full">
      <div className="flex items-center justify-between px-1 py-4 sm:px-2">
        <Header title={`Edit ${section?.title} Section`} order={2} />
        <Button
          variant="outline"
          className="w-1/3"
          onClick={() => router.back()}
        >
          <span>Go Back</span>
        </Button>
      </div>
      <div className="py-4">
        <ContentForm
          form={form}
          preview={preview}
          isLoading={isUpdatingSection}
          onChangePicture={onChangePicture}
          onSubmit={onSubmit}
          setIsEdit={setIsEdit}
        />
      </div>
    </section>
  );
}
