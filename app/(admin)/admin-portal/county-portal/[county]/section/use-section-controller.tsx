"use client";

import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";

// redux global state (Model)
import {
  useGetSectionByIdQuery,
  useCreateSectionMutation,
  useCreateSubSectionMutation,
  useUpdateSectionByIdMutation,
  useGetSubSectionByIdQuery,
  useUpdateSubSectionByIdMutation,
} from "@global-state/features/editor/editorApiSlice";

// zod schemas
import {
  PartialSectionSchemaProps,
  partialSectionSchema,
} from "@models/Section";

export default function useSectionController(
  sectionId?: string,
  subSectionId?: string,
  type?: "section" | "subsection",
  id?: string
) {
  const { toast } = useToast();

  // get section by id
  const {
    data: sectionData,
    isLoading: isLoadingSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(sectionId as string, {
    skip: !sectionId,
  });

  // section mutation hooks
  const [createSection, { isLoading: isCreatingSection }] =
    useCreateSectionMutation();

  const [updateSectionById, { isLoading: isUpdatingSection }] =
    useUpdateSectionByIdMutation();

  // get sub section by id
  const {
    data: subSectionData,
    isLoading: isLoadingSubSection,
    refetch: refetchSubSection,
  } = useGetSubSectionByIdQuery(subSectionId as string, {
    skip: !subSectionId,
    refetchOnMountOrArgChange: true,
  });

  // sub section mutation hooks
  const [createSubSection, { isLoading: isCreatingSubSection }] =
    useCreateSubSectionMutation();
  const [updateSubSectionById, { isLoading: isUpdatingSubSection }] =
    useUpdateSubSectionByIdMutation();

  const form = useForm<PartialSectionSchemaProps>({
    resolver: zodResolver(partialSectionSchema),
  });

  const createSectionHandler: SubmitHandler<PartialSectionSchemaProps> =
    useCallback(
      async (data) => {
        const sectionData = { ...data, id: id };

        try {
          if (type === "section") {
            const response = await createSection(sectionData).unwrap();
            toast({
              title: "Success!",
              description: response.message,
            });
            form.reset();
            refetchSection();
          }
          if (type === "subsection") {
            const response = await createSubSection(sectionData).unwrap();
            toast({
              title: "Success!",
              description: response.message,
            });
            form.reset();
            refetchSubSection();
          }
        } catch (error) {
          if (!error?.response) {
            toast({
              title: "Error!",
              description: "Unable to complete request",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else if (error.response?.status === 400) {
            toast({
              title: "Error!",
              description: "Invalid Input Provided",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else if (error.response?.status === 401) {
            toast({
              title: "Error!",
              description: "Unauthorized action",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else {
            toast({
              title: "Error!",
              description: "Unable to complete request",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          }
        }
      },
      [id]
    );

  return {
    form,
    sectionData,
    subSectionData,
    isLoadingSection,
    isLoadingSubSection,
    isCreatingSection,
    isCreatingSubSection,
    isUpdatingSection,
    isUpdatingSubSection,
    refetchSection,
    createSectionHandler,
    updateSectionById,
    updateSubSectionById,
  };
}
