"use client";

import React from "react";
import { useRouter } from "next/navigation";

// hooks
import { useContentForm } from "@hooks/useContentForm";

// hooks (Controller)
import useSectionController from "../use-section-controller";

// components
import { ContentForm } from "@components/forms";
import Loader from "@components/Loader";
import { Button } from "@components/ui/button";
import Header from "@components/Header";

type EditSectionProps = {
  sectionId: string;
};

export default function EditSection({ sectionId }: EditSectionProps) {
    const router = useRouter();
  const { sectionData, isLoadingSection, isUpdatingSection, updateSectionById, refetchSection } =
    useSectionController(sectionId, undefined, "section", undefined);

  const defaultValues = {
    title: sectionData?.title ? (sectionData?.title as string) : "",
    isLive: sectionData?.isLive ? (sectionData?.isLive as boolean) : false,
    content: sectionData?.content ? (sectionData?.content as string) : "",
    author: sectionData?.author ? (sectionData?.author as string) : "",
    summary: sectionData?.summary ? (sectionData?.summary as string) : "",
    imageFile: undefined,
    videoUrl: sectionData?.videoUrl ? (sectionData?.videoUrl as string) : "",
    videoTitle: sectionData?.videoTitle
      ? (sectionData?.videoTitle as string)
      : "",
    videoDescription: sectionData?.videoDescription
      ? (sectionData?.videoDescription as string)
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
  }, [sectionData]);

   if (isLoadingSection) {
     return (
       <div className="flex h-[700px] items-center justify-center">
         <Loader className="h-12 w-12" />
       </div>
     );
   }


  return (
    <section className="sm:h-screen">
      <div className="px-1 py-4 sm:px-2 flex items-center justify-between">
        <Header title={`Edit ${sectionData?.title} Section`} order={2} />
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
