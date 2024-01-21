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

type EditSectionProps = {
  countyId: string;
};

export default function EditLEPSection({ countyId }: EditSectionProps) {
  const router = useRouter();
  const {
    county,
    refetchCounty,
    updateOrCreateCountyLEP,
    isLoadingCounty,
    isUpsertingLEP,
  } = useCountyController(countyId, undefined);

  const defaultValues = {
    title: county?.lep?.title ? (county?.lep?.title as string) : "",
    isLive: county?.lep?.isLive ? (county?.lep?.isLive as boolean) : false,
    content: county?.lep?.content ? (county?.lep?.content as string) : "",
    author: county?.lep?.author ? (county?.lep?.author as string) : "",
    summary: county?.lep?.summary ? (county?.lep?.summary as string) : "",
    imageFile: undefined,
    videoUrl: county?.lep?.videoUrl ? (county?.lep?.videoUrl as string) : "",
    videoTitle: county?.lep?.videoTitle
      ? (county?.lep?.videoTitle as string)
      : "",
    videoDescription: county?.lep?.videoDescription
      ? (county?.lep?.videoDescription as string)
      : "",
  };
  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        defaultValues,
        updateOrCreate: updateOrCreateCountyLEP,
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
        <Loader className="h-12 w-12"/>
      </div>
    );
  }

  return (
    <section className="sm:h-screen">
      <div className="flex items-center justify-between px-1 py-4 sm:px-2">
        <Header title={`Edit ${county?.lep?.title} Section`} order={2} />
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
          isLoading={isUpsertingLEP}
          onChangePicture={onChangePicture}
          onSubmit={onSubmit}
          setIsEdit={setIsEdit}
        />
      </div>
    </section>
  );
}
