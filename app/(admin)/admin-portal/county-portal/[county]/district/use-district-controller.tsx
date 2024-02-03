"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// redux global state (Model)
import {
  useGetDistrictByIdQuery,
  useCreateDistrictSectionMutation,
  useGetDistrictSectionByIdQuery,
  useUpdateDistrictSectionByIdMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  partialDistrictSectionSchema,
  PartialDistrictSectionSchemaProps,
} from "@models/District";

export default function useDistrictController(
  districtId?: string,
  districtSectionId?: string,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();

  // get district by id
  const {
    data: district,
    isLoading: isLoadingDistrict,
    refetch: refetchDistrict,
  } = useGetDistrictByIdQuery(districtId as string, {
    refetchOnMountOrArgChange: true,
    skip: !districtId,
  });

  // district mutation hooks
  const [createDistrictSection, { isLoading: isCreatingDistrictSection }] =
    useCreateDistrictSectionMutation();
  const [updateDistrictSectionById, { isLoading: isUpdatingDistrictSection }] =
    useUpdateDistrictSectionByIdMutation();

  // get district section by id
  const {
    data: districtSection,
    isLoading: isLoadingDistrictSection,
    refetch: refetchDistrictSection,
  } = useGetDistrictSectionByIdQuery(districtSectionId as string, {
    refetchOnMountOrArgChange: true,
    skip: !districtSectionId,
  });

  const form = useForm<PartialDistrictSectionSchemaProps>({
    resolver: zodResolver(partialDistrictSectionSchema),
  });

  const onSubmit: SubmitHandler<PartialDistrictSectionSchemaProps> =
    React.useCallback(
      async (data) => {
        const sectionData = { ...data, districtId: districtId as string };

        try {
          const response = await createDistrictSection(sectionData).unwrap();
          if (response.success) {
            toast({
              title: "Success!",
              description: response.message,
              action: <ToastAction altText="Close">Close</ToastAction>,
            });
            setOpen!(false);
            form.reset();
            refetchDistrictSection();
          }
        } catch (error) {
          if (isFetchBaseQueryError(error)) {
            const errMsg =
              "error" in error ? error.error : JSON.stringify(error.message);
            toast({
              title: "Error!",
              description:
                (errMsg as string) || "Unable create district section",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else if (isErrorWithMessage(error)) {
            toast({
              title: "Error!",
              description: error.message || "Unable create district section",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          }
        }
      },
      [districtId],
    );

  const setEDLive: SubmitHandler<PartialDistrictSectionSchemaProps> =
    React.useCallback(async (data) => {
      const sectionData = { ...data, id: districtSectionId as string };

      try {
        const response = await updateDistrictSectionById(sectionData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
            action: <ToastAction altText="Close">Close</ToastAction>,
          });
          form.reset();
          refetchDistrictSection();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable create district section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable create district section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    }, []);

  return {
    form,
    district,
    districtSection,
    isLoadingDistrict,
    isCreatingDistrictSection,
    isLoadingDistrictSection,
    isUpdatingDistrictSection,
    refetchDistrict,
    onSubmit,
    updateDistrictSectionById,
    refetchDistrictSection,
    setEDLive,
  };
}
