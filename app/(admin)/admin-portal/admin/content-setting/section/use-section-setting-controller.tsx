"use client";

import React from "react";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// redux global state (Model)
import {
  useGetSectionsQuery,
  useUpdateSectionByIdMutation,
  useDeleteSectionByIdMutation,
  useDeleteManySectionsMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  PartialSectionSchemaProps,
  partialSectionSchema,
} from "@models/Section";

export default function useSectionSettingController(
  defaultValues?: PartialSectionSchemaProps,
  dataProps?: PartialSectionSchemaProps,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();
  const {
    data: sectionData = [],
    isLoading: isLoadingSections,
    refetch: refetchSections,
  } = useGetSectionsQuery();
  const [updateSectionById, { isLoading: isUpdatingSection }] =
    useUpdateSectionByIdMutation();
  const [deleteSectionById, { isLoading: isDeleting }] =
    useDeleteSectionByIdMutation();
  const [deleteManySections, { isLoading: isDeletingMany }] =
    useDeleteManySectionsMutation();

  const form = useForm<PartialSectionSchemaProps>({
    resolver: zodResolver(partialSectionSchema),
    defaultValues: { ...defaultValues },
  });

  // reset the form when the data changes
  React.useEffect(() => {
    form.reset({ ...defaultValues });
  }, [dataProps]);

  const handleUpdate = React.useCallback(
    async (data: PartialSectionSchemaProps) => {
      const newData = { ...data, id: dataProps?.id as string };
      try {
        const response = await updateSectionById(newData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          refetchSections();
          setOpen!(false);
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable to update section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to update section",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    [dataProps],
  );

  const handleDelete = React.useCallback(async (id: string) => {
    try {
      const response = await deleteSectionById(id).unwrap();
      if (response.success) {
        toast({
          title: "Success!",
          description: response.message,
        });
        refetchSections();
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          title: "Error!",
          description: (errMsg as string) || "Unable to delete section",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          title: "Error!",
          description: error.message || "Unable to delete section",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    }
  }, []);

  const handleDeleteMany = React.useCallback(
    async (rows: PartialSectionSchemaProps[]) => {
      const selectedSectionIds = rows.map((row) => row.id);
      try {
        const response = await deleteManySections(
          selectedSectionIds as string[],
        ).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          refetchSections();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable to delete sections",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to delete sections",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    [],
  );

  return {
    sectionData,
    isLoadingSections,
    isDeleting,
    isDeletingMany,
    isUpdatingSection,
    form,
    refetchSections,
    handleUpdate,
    handleDelete,
    handleDeleteMany,
  };
}
