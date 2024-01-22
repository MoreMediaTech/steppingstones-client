"use client";

import React from "react";
import { MdEditSquare } from "react-icons/md";
// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { AdsForm } from "./ads-form";

import useAdsSectionController from "./use-ads-section-controller";

import { PartialAdvertSchemaProps } from "@models/Advert";

export default function EditAds({
  advert,
}: {
  advert: PartialAdvertSchemaProps;
}) {
  const defaultValues = {
    title: advert.title,
    published: advert.published,
    author: advert.author,
    summary: advert.summary,
    videoUrl: advert.videoUrl,
    videoTitle: advert.videoTitle,
    videoDescription: advert.videoDescription,
    id: advert.id,
  };
  
  const {
    form,
    preview,
    updateAdHandler,
    isEdit,
    setIsEdit,
    isCreating,
    onChangePicture,
  } = useAdsSectionController(defaultValues, advert.id);

  return (
    <Dialog open={isEdit} onOpenChange={setIsEdit}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-ful gap-1 md:w-1/3">
          <MdEditSquare className="text-lg" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px]">
        <ScrollArea className="max-h-[900px] py-4">
          <DialogHeader>
            <DialogTitle>Edit Advert</DialogTitle>
            <DialogDescription>
              Update the advert details below.
            </DialogDescription>
          </DialogHeader>
          <AdsForm
            form={form}
            preview={preview}
            onSubmit={updateAdHandler}
            isLoading={isCreating}
            onChangePicture={onChangePicture}
            buttonTitle="Update Advert"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
