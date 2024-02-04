"use client";

import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// redux global state (Model)
import {
  useGetEconomicDataWidgetsQuery,
  useGetEconomicDataWidgetByIdQuery,
  useCreateEconomicDataWidgetMutation,
  useUpdateEconomicDataWidgetByIdMutation,
  useDeleteEconomicDataWidgetByIdMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  PartialEconomicDataSchemaProps,
  partialEconomicDataSchema,
} from "@models/LocalFeedContent";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

export default function useEconomicDataController(
  sectionId?: string,
  economicDataId?: string,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();

  // get economic data widgets
  const {
    data: economicDataWidgets,
    refetch,
    isLoading,
  } = useGetEconomicDataWidgetsQuery(sectionId as string, {
    skip: !sectionId,
  });

  // get economic data widget by id
  const { data: economicDataWidget, isLoading: isLoadingWidget } =
    useGetEconomicDataWidgetByIdQuery(economicDataId as string, {
      refetchOnMountOrArgChange: true,
      skip: !economicDataId,
    });
  // economic data widget mutation hooks
  const [createEconomicDataWidget, { isLoading: isCreating }] =
    useCreateEconomicDataWidgetMutation();

  const [updateEconomicDataWidgetById, { isLoading: isUpdating }] =
    useUpdateEconomicDataWidgetByIdMutation();

  const [deleteEconomicDataWidgetById, { isLoading: isDeleting }] =
    useDeleteEconomicDataWidgetByIdMutation();

  const form = useForm<PartialEconomicDataSchemaProps>({
    resolver: zodResolver(partialEconomicDataSchema),
    defaultValues: {
      title: "",
      stats: "",
      descriptionLine1: "",
      descriptionLine2: "",
      linkName: "",
      linkUrl: "",
    },
  });

  const createEconomicDataHandler: SubmitHandler<PartialEconomicDataSchemaProps> =
    useCallback(
      async (data) => {
        try {
          const formData = {
            ...data,
            sectionId,
          };
          const response = await createEconomicDataWidget(
            formData as PartialEconomicDataSchemaProps,
          ).unwrap();
          if (response.success) {
            toast({
              title: "Success!",
              description: response.message,
            });
            refetch();
            form.reset();
            setOpen!(false);
          }
        } catch (error) {
          if (isFetchBaseQueryError(error)) {
            const errMsg =
              "error" in error ? error.error : JSON.stringify(error.message);
            toast({
              title: "Error!",
              description: (errMsg as string) || "Unable create economic data",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else if (isErrorWithMessage(error)) {
            toast({
              title: "Error!",
              description: error.message || "Unable create economic data",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          }
        }
      },
      [sectionId],
    );

  const updateEconomicDataHandler: SubmitHandler<PartialEconomicDataSchemaProps> =
    useCallback(
      async (data) => {
        try {
          const formData = {
            ...data,
            id: economicDataId,
          };

          const response = await updateEconomicDataWidgetById(
            formData as PartialEconomicDataSchemaProps,
          ).unwrap();
          if (response.success) {
            toast({
              title: "Success!",
              description: response.message,
            });
            form.reset();
            refetch();
            setOpen!(false);
          }
        } catch (error) {
          if (isFetchBaseQueryError(error)) {
            const errMsg =
              "error" in error ? error.error : JSON.stringify(error.message);
            toast({
              title: "Error!",
              description: (errMsg as string) || "Unable update economic data",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          } else if (isErrorWithMessage(error)) {
            toast({
              title: "Error!",
              description: error.message || "Unable update economic data",
              action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
          }
        }
      },
      [economicDataId],
    );

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await deleteEconomicDataWidgetById(id).unwrap();
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
          description: (errMsg as string) || "Unable delete economic data",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          title: "Error!",
          description: error.message || "Unable delete economic data",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    }
  }, []);

  return {
    form,
    economicDataWidgets,
    economicDataWidget,
    isLoading,
    isLoadingWidget,
    isCreating,
    isUpdating,
    isDeleting,
    createEconomicDataHandler,
    updateEconomicDataHandler,
    handleDelete,
  };
}
