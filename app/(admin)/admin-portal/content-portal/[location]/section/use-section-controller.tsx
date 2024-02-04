"use client";

import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

// redux global state (Model)
import {
  useGetSectionByIdQuery,
  useGetSectionByParentIdQuery,
  useCreateSectionMutation,
  useUpdateSectionByIdMutation,
  useGetLocalFeedQuery,
  useGetFeedContentByIdQuery,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// zod schemas
import {
  PartialSectionSchemaProps,
  SectionType,
  partialSectionSchema,
} from "@models/Section";

export type CreateSectionType = "section" | "subsection";

export const sectionType = [
  { value: SectionType.FEED_SECTION, label: "Feed Section" },
  { value: SectionType.LOCAL_FEED_SECTION, label: "Local Feed Section" },
  {
    value: SectionType.ABOVE_THE_FOLD_CONTENT,
    label: "Above the Fold Content",
  },
  { value: SectionType.ECONOMIC_DATA, label: "Economic Data" },
  { value: SectionType.CHILD_SECTION, label: "Sub Section" },
];

export default function useSectionController(
  sectionId?: string,
  contentId?: string,
  parentId?: string,
) {
  const { toast } = useToast();

  // get section by id
  const {
    data: section,
    isLoading: isLoadingSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(sectionId as string, {
    skip: !sectionId,
  });

  const { refetch: refetchFeedContent } = useGetFeedContentByIdQuery(
    contentId as string,
    {
      skip: !contentId,
    },
  );

  // get section by parent id
  const { data: subSectionData, isLoading: isLoadingSubSection } =
    useGetSectionByParentIdQuery(parentId as string, {
      skip: !parentId,
    });

  // section mutation hooks
  const [createSection, { isLoading: isCreatingSection }] =
    useCreateSectionMutation();

  const [updateSectionById, { isLoading: isUpdatingSection }] =
    useUpdateSectionByIdMutation();

  const form = useForm<PartialSectionSchemaProps>({
    resolver: zodResolver(partialSectionSchema),
    defaultValues: {
      name: "",
      type: SectionType.FEED_SECTION,
      isSubSection: false,
    },
  });

  const createSectionHandler: SubmitHandler<PartialSectionSchemaProps> =
    useCallback(
      async (data) => {
        const sectionData = {
          ...data,
          parentId: parentId,
          feedContentId: contentId,
        };

        try {
          const response = await createSection(sectionData).unwrap();
          toast({
            title: "Success!",
            description: response.message,
          });
          if (data.type === SectionType.FEED_SECTION) {
            refetchFeedContent();
          }
          if (data.type === SectionType.CHILD_SECTION) {
            refetchSection();
          }
          form.reset();
        } catch (error) {
          if (isFetchBaseQueryError(error)) {
            const errMsg =
              "error" in error ? error.error : JSON.stringify(error.message);
            toast({
              title: "Error!",
              description: (errMsg as string) || "Unable create section",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else if (isErrorWithMessage(error)) {
            toast({
              title: "Error!",
              description: error.message,
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          }
        }
      },
      [parentId, contentId],
    );

  return {
    form,
    section,
    subSectionData,
    isLoadingSection,
    isLoadingSubSection,
    isCreatingSection,
    isUpdatingSection,
    refetchSection,
    createSectionHandler,
    updateSectionById,
  };
}
