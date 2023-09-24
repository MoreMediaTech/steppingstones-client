"use client";

import React from "react";
import { useRouter } from "next/navigation";

// hooks
import { useContentForm } from "@hooks/useContentForm";

// hooks (Controller)
import useCountyController from "../../../use-county-controller";

// components
import { ContentForm } from "@components/forms";
import { Loader } from "@components/mantine-components";
import { Button } from "@components/ui/button";
import Header from "@components/Header";

type EditSectionProps = {
  countyId: string;
};

export default function EditWelcomeSection({ countyId }: EditSectionProps) {
  const router = useRouter();

  const {
    county,
    refetchCounty,
    updateOrCreateCountyWelcome,
    isLoadingCounty,
    isUpsertingWelcome,
  } = useCountyController(countyId, undefined);

  const defaultValues = {
    title: county?.welcome?.title ? (county?.welcome?.title as string) : "",
    isLive: county?.welcome?.isLive
      ? (county?.welcome?.isLive as boolean)
      : false,
    content: county?.welcome?.content
      ? (county?.welcome?.content as string)
      : "",
    author: county?.welcome?.author ? (county?.welcome?.author as string) : "",
    summary: county?.welcome?.summary
      ? (county?.welcome?.summary as string)
      : "",
    imageFile: undefined,
    videoUrl: county?.welcome?.videoUrl
      ? (county?.welcome?.videoUrl as string)
      : "",
    videoTitle: county?.welcome?.videoTitle
      ? (county?.welcome?.videoTitle as string)
      : "",
    videoDescription: county?.welcome?.videoDescription
      ? (county?.welcome?.videoDescription as string)
      : "",
  };

  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        defaultValues,
        updateOrCreate: updateOrCreateCountyWelcome,
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
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <section className="sm:h-screen">
      <div className="flex items-center justify-between px-1 py-4 sm:px-2">
        <Header title={`Edit ${county?.welcome?.title} Section`} order={2} />
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
          isLoading={isUpsertingWelcome}
          onChangePicture={onChangePicture}
          onSubmit={onSubmit}
          setIsEdit={setIsEdit}
        />
      </div>
    </section>
  );
}
