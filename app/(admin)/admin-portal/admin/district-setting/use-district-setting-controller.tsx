"use client";

import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  useGetDistrictsQuery,
  useUpdateDistrictByIdMutation,
  useDeleteDistrictByIdMutation,
  useDeleteDistrictSectionByIdMutation,
} from "app/global-state/features/editor/editorApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import {
  PartialDistrictSchemaProps,
  partialDistrictSchema,
} from "@models/District";

export default function useDistrictSettingController(
  defaultValues?: PartialDistrictSchemaProps,
  dataProps?: PartialDistrictSchemaProps
) {
  const { toast } = useToast();

  const {
    data: districtData,
    isLoading: isLoadingDistricts,
    refetch: refetchDistricts,
  } = useGetDistrictsQuery();
  const [updateDistrictById] = useUpdateDistrictByIdMutation();
  const [deleteDistrictById] = useDeleteDistrictByIdMutation();
  const [deleteDistrictSectionById] = useDeleteDistrictSectionByIdMutation();

  const form = useForm<PartialDistrictSchemaProps>({
    resolver: zodResolver(partialDistrictSchema),
    defaultValues: { ...defaultValues },
  });

  // reset the form when the data changes
  useEffect(() => {
    form.reset({ ...defaultValues });
  }, [dataProps]);

  /**
   * @description Update district handler
   */
  const updateDistrictHandler: SubmitHandler<PartialDistrictSchemaProps> =
    useCallback(async (data) => {
      const newData = {
        id: dataProps?.id as string,
        ...data,
      };
      try {
        const response = await updateDistrictById(newData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          refetchDistricts();
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
  const deleteDistrictHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteDistrictById(id).unwrap();
      refetchDistricts();
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
  const deleteDistrictSectionHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteDistrictSectionById(id).unwrap();
      refetchDistricts();
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
    districtData,
    isLoadingDistricts,
    form,
    deleteDistrictHandler,
    updateDistrictHandler,
    deleteDistrictSectionHandler,
  };
}
