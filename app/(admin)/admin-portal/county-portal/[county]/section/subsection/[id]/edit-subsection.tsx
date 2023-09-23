"use client";

import React from "react";
import { useRouter } from "next/navigation";

// hooks
import { useContentForm } from "@hooks/useContentForm";

// hooks (Controller)
import useSectionController from "../../use-section-controller";

// components
import { ContentForm } from "@components/forms";
import { Loader } from "@components/mantine-components";
import { Button } from "@components/ui/button";
import Header from "@components/Header";

type EditSubSectionProps = {
  subSectionId: string;
};

export default function EditSubSection({ subSectionId }: EditSubSectionProps) {
  const router = useRouter();
  const {
    subSectionData,
    isLoadingSubSection,
    isUpdatingSection,
    updateSectionById,
    refetchSection,
  } = useSectionController(undefined, subSectionId, "subsection");

  const defaultValues = {
    title: subSectionData?.title ? (subSectionData?.title as string) : "",
    isLive: subSectionData?.isLive
      ? (subSectionData?.isLive as boolean)
      : false,
    content: subSectionData?.content ? (subSectionData?.content as string) : "",
    author: subSectionData?.author ? (subSectionData?.author as string) : "",
    summary: subSectionData?.summary ? (subSectionData?.summary as string) : "",
    imageFile: undefined,
    videoUrl: subSectionData?.videoUrl
      ? (subSectionData?.videoUrl as string)
      : "",
    videoTitle: subSectionData?.videoTitle
      ? (subSectionData?.videoTitle as string)
      : "",
    videoDescription: subSectionData?.videoDescription
      ? (subSectionData?.videoDescription as string)
      : "",
  };
  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        defaultValues,
        updateOrCreate: updateSectionById,
      },
      refetchSection
    );

  React.useEffect(() => {
    // reset the form when the county data is changed/updated
    form.reset({ ...defaultValues });
  }, [subSectionData]);

  if (isLoadingSubSection) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <section className="h-screen">
      <div className="px-1 py-4 sm:px-2 flex items-center justify-between">
        <Header title={`Edit ${subSectionData?.title} Section`} order={2} />
        <Button variant="outline" className="w-1/3" onClick={() => router.back()}>
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
