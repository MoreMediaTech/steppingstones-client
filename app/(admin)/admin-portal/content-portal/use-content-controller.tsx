"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// redux global state (Model)
import {
  useGetFeedContentQuery,
  useGetFeedContentByIdQuery,
  useCreateLocalFeedContentMutation,
  useCreateSectionMutation,
  useGetSectionByIdQuery,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  PartialLocalFeedContentSchemaProps,
  partialLocalFeedSchema,
} from "@models/LocalFeedContent";

export default function useContentController(
  feedContentId?: string,
  contentId?: string,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();
  // get all counties
  const { data: feedContents, isLoading: isLoadingFeedContents } =
    useGetFeedContentQuery();
  // get county by id
  const {
    data: feedContent,
    isLoading: isLoadingFeedContent,
    refetch: refetchCounty,
  } = useGetFeedContentByIdQuery(feedContentId as string, {
    refetchOnMountOrArgChange: true,
    skip: !feedContentId,
  });

  // get above the fold content (section) by id
  const { data: section, isLoading: isLoadingSection } = useGetSectionByIdQuery(
    contentId as string,
    {
      refetchOnMountOrArgChange: true,
      skip: !contentId,
    },
  );

  // create section mutation hooks
  const [createSection, { isLoading: isCreateSection }] =
    useCreateSectionMutation();

  const [createLocalFeedContent, { isLoading: isCreatingLocalFeedContent }] =
    useCreateLocalFeedContentMutation();

  // react-hook-form hooks
  const form = useForm<PartialLocalFeedContentSchemaProps>({
    resolver: zodResolver(partialLocalFeedSchema),
  });

  const createLocalFeedContentHandler: SubmitHandler<PartialLocalFeedContentSchemaProps> =
    React.useCallback(
      async (data) => {
        const newData = { ...data, feedContentId };
        try {
          const response = await createLocalFeedContent(newData).unwrap();
          if (response.success) {
            form.reset();
            refetchCounty();
            setOpen!(false);
            toast({
              title: "Success!",
              description: response.message,
            });
          }
        } catch (error) {
          if (isFetchBaseQueryError(error)) {
            const errMsg =
              "error" in error ? error.error : JSON.stringify(error.message);
            toast({
              title: "Error!",
              description: (errMsg as string) || "Unable create district",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else if (isErrorWithMessage(error)) {
            toast({
              title: "Error!",
              description: error.message || "Unable create district",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          }
        }
      },
      [feedContentId],
    );

  return {
    feedContent,
    feedContents,
    section,
    isLoadingFeedContents,
    isLoadingFeedContent,
    isCreatingLocalFeedContent,
    isCreateSection,
    isLoadingSection,
    form,
    refetchCounty,
    createLocalFeedContentHandler,
    createSection,
  };
}
