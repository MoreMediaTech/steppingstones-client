"use client";

import React from "react";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// redux global state (Model)
import {
  useGetSectionsQuery,
  useDeleteSectionByIdMutation,
  useDeleteManySectionsMutation,
  useDeleteSubSectionByIdMutation,
  useDeleteManySubSectionsMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import { PartialSectionSchemaProps } from "@models/Section";

export default function useSectionSettingController() {
  const { toast } = useToast();
  const {
    data: sectionData = [],
    isLoading: isLoadingSections,
    refetch: refetchSections,
  } = useGetSectionsQuery();
  const [deleteSectionById, { isLoading: isDeleting }] =
    useDeleteSectionByIdMutation();
  const [deleteManySections, { isLoading: isDeletingMany }] =
    useDeleteManySectionsMutation();
  const [deleteSubSectionById, { isLoading: isDeletingSubSection }] =
    useDeleteSubSectionByIdMutation();
  const [deleteManySubSections] = useDeleteManySubSectionsMutation();

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

  const deleteSubSectionHandler = React.useCallback(async (id: string) => {
    try {
      const response = await deleteSubSectionById(id).unwrap();
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

  const deleteManySubsectionHandler = React.useCallback(
    async (rows: PartialSectionSchemaProps[]) => {
      const selectedSectionIds = rows.map((row) => row.id);
      try {
        const response = await deleteManySubSections(
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
    handleDelete,
    handleDeleteMany,
    deleteSubSectionHandler,
    deleteManySubsectionHandler,
  };
}
