"use client";

import React from "react";

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
import { AdsForm } from "./ads-form";

import useAdsSectionController from "./use-ads-section-controller";
import { ScrollArea } from "@components/ui/scroll-area";

export default function CreateAds() {
  const { form, preview, createAdHandler, isEdit, setIsEdit, isCreating, onChangePicture } =
    useAdsSectionController(undefined);
  return (
    <Dialog open={isEdit} onOpenChange={setIsEdit}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-ful md:w-1/2">
          Create Ad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px]">
        <ScrollArea className="max-h-[900px] py-4">
          <DialogHeader>
            <DialogTitle>Create a new Advert</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new advert.
            </DialogDescription>
          </DialogHeader>
          <AdsForm
            form={form}
            preview={preview}
            onSubmit={createAdHandler}
            isLoading={isCreating}
            onChangePicture={onChangePicture}
            buttonTitle="Create Advert"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
