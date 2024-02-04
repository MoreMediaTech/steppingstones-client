"use client";

import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useGetLocalFeedQuery,
  useUpdateLocalFeedContentByIdMutation,
  useDeleteLocalFeedContentByIdMutation,
  useDeleteSectionByIdMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import {
  PartialLocalFeedContentSchemaProps,
  partialLocalFeedSchema,
} from "@models/LocalFeedContent";

export default function useLocalFeedSettingController(
  defaultValues?: PartialLocalFeedContentSchemaProps,
  dataProps?: PartialLocalFeedContentSchemaProps,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();

  const {
    data: localFeedData = [],
    isLoading: isLoadingLocalFeed,
    refetch: refetchLocalFeed,
  } = useGetLocalFeedQuery();
  const [updateLocalFeedContentById] = useUpdateLocalFeedContentByIdMutation();
  const [deleteLocalFeedContentById] = useDeleteLocalFeedContentByIdMutation();
  const [deleteSectionById] = useDeleteSectionByIdMutation();

  const form = useForm<PartialLocalFeedContentSchemaProps>({
    resolver: zodResolver(partialLocalFeedSchema),
    defaultValues: { ...defaultValues },
  });

  // reset the form when the data changes
  useEffect(() => {
    form.reset({ ...defaultValues });
  }, [dataProps]);

  /**
   * @description Update district handler
   */
  const updateLocalFeedContentHandler: SubmitHandler<PartialLocalFeedContentSchemaProps> =
    useCallback(async (data) => {
      const newData = {
        id: dataProps?.id as string,
        ...data,
      };
      try {
        const response = await updateLocalFeedContentById(newData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          setOpen!(false);
          refetchLocalFeed();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              (errMsg as string) ||
              "Unable to update district. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              error.message || "Unable to update district Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    }, []);

  /**
   * @description Delete district handler
   */
  const deleteLocalFeedContentHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteLocalFeedContentById(id).unwrap();
      refetchLocalFeed();
      toast({
        title: "Success!",
        description: response.message,
      });
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            (errMsg as string) || "Unable to delete county. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            error.message || "Unable to delete county Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  }, []);

  /**
   * @description Delete district section handler
   */
  const deleteSectionHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteSectionById(id).unwrap();
      refetchLocalFeed();
      toast({
        title: "Success!",
        description: response.message,
      });
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            (errMsg as string) || "Unable to delete county. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            error.message || "Unable to delete county Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  }, []);

  return {
    localFeedData,
    isLoadingLocalFeed,
    form,
    updateLocalFeedContentHandler,
    deleteLocalFeedContentHandler,
    deleteSectionHandler,
  };
}
