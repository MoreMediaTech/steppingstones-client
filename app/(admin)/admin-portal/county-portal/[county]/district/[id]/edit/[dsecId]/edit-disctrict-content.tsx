"use client";

import React from "react";
import { useRouter } from "next/navigation";

// hooks
import { useContentForm } from "@hooks/useContentForm";

// hooks (Controller)
import useDistrictController from "../../../use-district-controller";

// components
import { ContentForm } from "@components/forms";
import Loader from "@components/Loader";
import { Button } from "@components/ui/button";
import Header from "@components/Header";
import { ScrollArea } from "@components/ui/scroll-area";

type EditSectionProps = {
  districtSectionId: string;
};

export default function EditDistrictContent({ districtSectionId }: EditSectionProps) {
    const router = useRouter();
 const { districtSection, isLoadingDistrictSection, isUpdatingDistrictSection, updateDistrictSectionById, refetchDistrictSection } = useDistrictController(undefined, districtSectionId, undefined);

  const defaultValues = {
    title: districtSection?.title ? (districtSection?.title as string) : "",
    isLive: districtSection?.isLive ? (districtSection?.isLive as boolean) : false,
    content: districtSection?.content ? (districtSection?.content as string) : "",
    author: districtSection?.author ? (districtSection?.author as string) : "",
    summary: districtSection?.summary ? (districtSection?.summary as string) : "",
    imageFile: undefined,
    videoUrl: districtSection?.videoUrl ? (districtSection?.videoUrl as string) : "",
    videoTitle: districtSection?.videoTitle
      ? (districtSection?.videoTitle as string)
      : "",
    videoDescription: districtSection?.videoDescription
      ? (districtSection?.videoDescription as string)
      : "",
    id: districtSection?.id ? (districtSection?.id as string) : "",
  };
  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        defaultValues,
        updateOrCreate: updateDistrictSectionById,
      },
        refetchDistrictSection
    );

  React.useEffect(() => {
    // reset the form when the county data is changed/updated
    form.reset({ ...defaultValues });
  }, [districtSection]);

   if (isLoadingDistrictSection) {
     return (
       <div className="flex h-[700px] items-center justify-center">
         <Loader className="h-12 w-12" />
       </div>
     );
   }


  return (
    <section className="min-h-screen max-h-screen">
      <ScrollArea>

      <div className="px-1 py-4 sm:px-2 flex items-center justify-between">
        <Header title={`Edit ${districtSection?.title} Section`} order={2} />
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
          isLoading={isUpdatingDistrictSection}
          onChangePicture={onChangePicture}
          onSubmit={onSubmit}
          setIsEdit={setIsEdit}
        />
      </div>
      </ScrollArea>
    </section>
  );
}