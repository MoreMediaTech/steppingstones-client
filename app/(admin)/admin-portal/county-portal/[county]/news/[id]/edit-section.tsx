"use client";

import React from "react";
import { useRouter } from "next/navigation";

// hooks
import { useContentForm } from "@hooks/useContentForm";

// hooks (Controller)
import useCountyController from "../../../use-county-controller";

// components
import { ContentForm } from "@components/forms";
import Loader from "@components/Loader";
import { Button } from "@components/ui/button";
import Header from "@components/Header";

type EditNewsSectionProps = {
  countyId: string;
};

export default function EditNewsSection({ countyId }: EditNewsSectionProps) {
    const router = useRouter();
  const {
    county,
    refetchCounty,
    updateOrCreateCountyNews,
    isLoadingCounty,
    isUpsertingNews,
  } = useCountyController(countyId, undefined);

    const defaultValues = {
      title: county?.news?.title ? (county?.news?.title as string) : "",
      isLive: county?.news?.isLive
        ? (county?.news?.isLive as boolean)
        : false,
      content: county?.news?.content
        ? (county?.news?.content as string)
        : "",
      author: county?.news?.author
        ? (county?.news?.author as string)
        : "",
      summary: county?.news?.summary
        ? (county?.news?.summary as string)
        : "",
      imageFile: undefined,
      videoUrl: county?.news?.videoUrl
        ? (county?.news?.videoUrl as string)
        : "",
      videoTitle: county?.news?.videoTitle
        ? (county?.news?.videoTitle as string)
        : "",
      videoDescription: county?.news?.videoDescription
        ? (county?.news?.videoDescription as string)
        : "",
    };

  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        defaultValues,
        updateOrCreate: updateOrCreateCountyNews,
      },
      refetchCounty
    );

  React.useEffect(() => {
    // reset the form when the county data is changed/updated
    form.reset({ ...defaultValues });
  }, [county]);

   if (isLoadingCounty) {
     return (
       <div className="flex h-[700px] items-center justify-center">
         <Loader className="h-12 w-12" />
       </div>
     );
   }


  return (
    <section className="sm:h-screen">
      <div className="px-1 py-4 sm:px-2 flex items-center justify-between">
        <Header title={`Edit ${county?.news?.title} Section`} order={2} />
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
          isLoading={isUpsertingNews}
          onChangePicture={onChangePicture}
          onSubmit={onSubmit}
          setIsEdit={setIsEdit}
        />
      </div>
    </section>
  );
}
