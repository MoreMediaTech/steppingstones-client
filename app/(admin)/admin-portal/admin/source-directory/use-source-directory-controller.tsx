"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// redux global state (Model)
import {
  useGetAllSDDataByTypeQuery,
  useDeleteSDDataMutation,
  useCreateSDDataMutation,
  useUpdateSDDataMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  PartialSourceDirectoryProps,
  partialSourceDirectorySchema,
  SourceDirectoryType,
} from "@models/SourceDirectory";

export default function useSourceDirectoryController(
  defaultValues?: PartialSourceDirectoryProps,
  source?: PartialSourceDirectoryProps,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();
  const [sdDataType, setSdDataType] = React.useState<string>("BSI");
  const [types] = React.useState<SourceDirectoryType[]>([
    SourceDirectoryType.BSI,
    SourceDirectoryType.EU,
    SourceDirectoryType.IS,
  ]);
  const {
    data: sourceData,
    isLoading,
    refetch,
  } = useGetAllSDDataByTypeQuery(sdDataType, {
    refetchOnMountOrArgChange: true,
  });
  const [createSDData, { isLoading: isCreating }] = useCreateSDDataMutation();
  const [updateSDData, { isLoading: isUpdating }] = useUpdateSDDataMutation();
  const [deleteSDData, { isLoading: isDeleting }] = useDeleteSDDataMutation();

  const form = useForm<PartialSourceDirectoryProps>({
    resolver: zodResolver(partialSourceDirectorySchema),
    defaultValues: { ...defaultValues },
  });

  const watch = form.watch();
  const { type } = watch;

  React.useEffect(() => {
    if (type) {
      setSdDataType(type);
    }
  }, [type]);

  React.useEffect(() => {
    form.reset({ ...defaultValues });
  }, [sourceData]);

  const handleCreate: SubmitHandler<PartialSourceDirectoryProps> =
    React.useCallback(async (data) => {
      try {
        const response = await createSDData(data).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          refetch();
          setOpen!(false);
          form.reset();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable create source",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable create source",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    }, []);

  const handleUpdate: SubmitHandler<PartialSourceDirectoryProps> =
    React.useCallback(async (data) => {
      try {
        const updatedData = { id: source?.id, ...data };
        const response = await updateSDData(updatedData).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          refetch();
          setOpen!(false);
          form.reset();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable update source",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable update source",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    }, []);

  const deleteHandler = React.useCallback(
    async (id: string, type?: PartialSourceDirectoryProps["type"]) => {
      const newData = {
        id,
        type,
      };
      try {
        const response = await deleteSDData(newData).unwrap();
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
            description: (errMsg as string) || "Unable delete source",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable delete source",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    [],
  );

  return {
    sourceData,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    types,
    form,
    handleCreate,
    handleUpdate,
    deleteHandler,
  };
}
