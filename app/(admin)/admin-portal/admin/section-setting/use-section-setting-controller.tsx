"use client";

import React from "react";

import {
  useGetSectionsQuery,
  useDeleteSectionByIdMutation,
  useDeleteManySectionsMutation,
  useDeleteSubSectionByIdMutation,
  useGetSubSectionsBySectionIdQuery,
  useDeleteManySubSectionsMutation,
} from "app/global-state/features/editor/editorApiSlice";

import { PartialSectionSchemaProps } from "@models/Section";

export default function useSectionSettingController() {
  const {
    data: sectionData,
    isLoading: isLoadingSections,
    refetch: refetchSections,
  } = useGetSectionsQuery();
  const [deleteSectionById, { isLoading: isDeleting}] = useDeleteSectionByIdMutation();
  const [deleteManySections, { isLoading: isDeletingMany}] = useDeleteManySectionsMutation();
  const [deleteSubSectionById, { isLoading: isDeletingSubSection }] =
    useDeleteSubSectionByIdMutation();
  const [deleteManySubSections] = useDeleteManySubSectionsMutation();

  const handleDelete = React.useCallback(async (id: string) => {
    try {
      const response = await deleteSectionById(id).unwrap();
      if (response.success) {
        refetchSections();
      }
    } catch (error) {}
  }, []);

  const handleDeleteMany = React.useCallback(
    async (rows: PartialSectionSchemaProps[]) => {
      const selectedSectionIds = rows.map((row) => row.id);
      try {
        const response = await deleteManySections(
          selectedSectionIds as string[]
        ).unwrap();
        if (response.success) {
          refetchSections();
        }
      } catch (error) {}
    },
    []
  );

   const deleteSubSectionHandler = React.useCallback(async (id: string) => {
     try {
       await deleteSubSectionById(id).unwrap();


 
     } catch (error) {
    
     }
   }, []);

   const deleteManySubsectionHandler = React.useCallback(
     async (rows: PartialSectionSchemaProps[]) => {
       const selectedSectionIds = rows.map((row) => row.id);
       try {
         const response = await deleteManySubSections(
           selectedSectionIds as string[]
         ).unwrap();
         if (response.success) {
         }
       } catch (error) {}
     },
     []
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
