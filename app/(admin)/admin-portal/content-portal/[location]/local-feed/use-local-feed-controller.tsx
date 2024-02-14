"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// redux global state (Model)
import {
  useGetLocalFeedContentByIdQuery,
  useCreateSectionMutation,
  useGetSectionByIdQuery,
  useUpdateSectionByIdMutation,
} from "@global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  PartialSectionSchemaProps,
  SectionType,
  partialSectionSchema,
} from "@models/Section";

export default function useLocalFeedController(
  localFeedId?: string,
  sectionId?: string,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();

  // get district by id
  const {
    data: localFeedContent,
    isLoading: isLoadingLocalFeedContent,
    refetch: refetchLocalFeedContent,
  } = useGetLocalFeedContentByIdQuery(localFeedId as string, {
    refetchOnMountOrArgChange: true,
    skip: !localFeedId,
  });

  // district mutation hooks
  const [createSection, { isLoading: isCreatingSection }] =
    useCreateSectionMutation();
  const [updateSectionById, { isLoading: isUpdatingSection }] =
    useUpdateSectionByIdMutation();

  // get district section by id
  const {
    data: section,
    isLoading: isLoadingSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(sectionId as string, {
    refetchOnMountOrArgChange: true,
    skip: !sectionId,
  });

  const form = useForm<PartialSectionSchemaProps>({
    resolver: zodResolver(partialSectionSchema),
  });

  const onSubmit: SubmitHandler<PartialSectionSchemaProps> = React.useCallback(
    async (data) => {
      const sectionData = {
        ...data,
        localFeedContentId: localFeedId as string,
        type: SectionType.LOCAL_FEED_SECTION,
      };

      try {
        const response = await createSection(sectionData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
            action: <ToastAction altText="Close">Close</ToastAction>,
          });
          setOpen!(false);
          form.reset();
          refetchLocalFeedContent();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable create  section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable create  section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    [localFeedId],
  );

  const setEDLive: SubmitHandler<PartialSectionSchemaProps> = React.useCallback(
    async (data) => {
      const sectionData = { ...data, id: sectionId as string };

      try {
        const response = await updateSectionById(sectionData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
            action: <ToastAction altText="Close">Close</ToastAction>,
          });
          form.reset();
          refetchSection();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable create  section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable create  section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    [],
  );

  return {
    form,
    localFeedContent,
    section,
    isLoadingLocalFeedContent,
    isLoadingSection,
    isCreatingSection,
    isUpdatingSection,
    onSubmit,
    updateSectionById,
    refetchSection,
    setEDLive,
  };
}
