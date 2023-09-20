"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useGetAllPartnersDataQuery,
  useCreatePartnerDataMutation,
  useUpdatePartnerDataMutation,
  useDeletePartnerDataMutation,
  useDeleteManyPartnerDataMutation,
} from "app/global-state/features/partner/partnerApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

import { PartialPartnerProps, PartialPartnerWithOrganisationProps, partialPartnerSchema } from "@models/Partner";

export default function usePartnerDirectoryController(
  defaultValues?: PartialPartnerProps,
  partner?: PartialPartnerProps,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { toast } = useToast();

  const {
    data: partnerData,
    isLoading: isLoadingPartnerData,
    refetch,
  } = useGetAllPartnersDataQuery();
  const [createPartnerData, { isLoading: isCreating }] =
    useCreatePartnerDataMutation();
  const [updatePartnerData, { isLoading: isUpdating }] =
    useUpdatePartnerDataMutation();
  const [deletePartnerData, { isLoading: isDeleting }] =
    useDeletePartnerDataMutation();
  const [deleteManyPartnerData, { isLoading: isDeletingMany }] =
    useDeleteManyPartnerDataMutation();

  const form = useForm<PartialPartnerProps>({
    resolver: zodResolver(partialPartnerSchema),
    defaultValues: { ...defaultValues },
  });

  // function that handles the creation of a new partner
  const createPartnerHandler: SubmitHandler<PartialPartnerProps> =
    React.useCallback(async (data) => {
      try {
        const response = await createPartnerData(data).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          setOpen!(false);
          refetch();
        } else {
          toast({
            description: response.message,
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
          setOpen!(false);
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable to create partner",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to create partner",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    }, []);

  // function that handles the update of a partner
  const updatePartnerHandler: SubmitHandler<PartialPartnerProps> =
    React.useCallback(async (data) => {
      const newData = {
        id: partner?.id,
        ...data,
      };

      try {
        const response = await updatePartnerData(newData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          setOpen!(false);
          refetch();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable to update partner",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to update partner",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    }, []);

  const deleteHandler = React.useCallback(async (id: string) => {
    try {
      const response = await deletePartnerData(id).unwrap();
      if (response.success) {
        toast({
          title: "Success!",
          description: response.message,
        });
        refetch();
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          title: "Error!",
          description: (errMsg as string) || "Unable to delete partner",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          title: "Error!",
          description: error.message || "Unable to delete partner",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    }
  }, []);

  // Function to delete the selected partners
  const handleDeleteMany = React.useCallback(
    async (rows: PartialPartnerWithOrganisationProps[]) => {
      const selectedPartnersId = rows.map((row) => row.id);
      try {
        const response = await deleteManyPartnerData(
          selectedPartnersId as string[]
        ).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          refetch();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable to delete partners",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to delete partners",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    []
  );

  return {
    partnerData,
    form,
    isCreating,
    isUpdating,
    isDeleting,
    isDeletingMany,
    isLoadingPartnerData,
    createPartnerHandler,
    updatePartnerHandler,
    deleteHandler,
    handleDeleteMany,
  };
}
