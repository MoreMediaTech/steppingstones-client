"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// redux global state (Model)
import {
  useGetCountiesQuery,
  useGetCountyByIdQuery,
  useCreateDistrictMutation,
  useUpdateOrCreateCountyNewsMutation,
  useUpdateOrCreateCountyWelcomeMutation,
  useUpdateOrCreateCountyLEPMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  PartialDistrictSchemaProps,
  partialDistrictSchema,
} from "@models/District";

export default function useCountyController(
  countyId?: string,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();
  // get all counties
  const { data: counties, isLoading: isLoadingCounties } =
    useGetCountiesQuery();
  // get county by id
  const {
    data: county,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(countyId as string, {
    refetchOnMountOrArgChange: true,
    skip: !countyId,
  });

  // county mutation hooks
  const [updateOrCreateCountyWelcome, { isLoading: isUpsertingWelcome }] =
    useUpdateOrCreateCountyWelcomeMutation();
  const [updateOrCreateCountyNews, { isLoading: isUpsertingNews }] =
    useUpdateOrCreateCountyNewsMutation();
  const [updateOrCreateCountyLEP, { isLoading: isUpsertingLEP }] =
    useUpdateOrCreateCountyLEPMutation();

  // react-hook-form hooks
  const form = useForm<PartialDistrictSchemaProps>({
    resolver: zodResolver(partialDistrictSchema),
  });

  const [createDistrict, { isLoading: isCreatingDistrict }] =
    useCreateDistrictMutation();

  const createDistrictHandler: SubmitHandler<PartialDistrictSchemaProps> =
    React.useCallback(
      async (data) => {
        const newData = { ...data, countyId };
        try {
          const response = await createDistrict(newData).unwrap();
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
      [countyId],
    );

  return {
    counties,
    county,
    isLoadingCounties,
    isLoadingCounty,
    isCreatingDistrict,
    isUpsertingWelcome,
    isUpsertingNews,
    isUpsertingLEP,
    form,
    refetchCounty,
    createDistrictHandler,
    updateOrCreateCountyWelcome,
    updateOrCreateCountyNews,
    updateOrCreateCountyLEP,
  };
}
