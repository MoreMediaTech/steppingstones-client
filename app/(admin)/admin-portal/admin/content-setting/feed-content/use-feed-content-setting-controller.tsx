"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// redux global state (Model)
import {
  useGetFeedContentQuery,
  useCreateFeedContentMutation,
  useUpdateFeedContentMutation,
  useRemoveFeedContentMutation,
} from "@app/global-state/features/content/contentApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  published: z.boolean().optional(),
  logoFile: z.string().optional(),
});

const partialFormSchema = formSchema.partial();

type FormSchemaProps = z.infer<typeof formSchema>;

export type PartialFormSchemaProps = z.infer<typeof partialFormSchema>;

export default function useFeedContentSettingController(
  defaultValues?: PartialFormSchemaProps,
  feedContentId?: string,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const {
    data: feedContent = [],
    isLoading: isLoadingFeedContent,
    refetch: refetchFeedContent,
  } = useGetFeedContentQuery();

  const [removeFeedContent, { isLoading: isRemoving }] =
    useRemoveFeedContentMutation();
  const [updateFeedContent, { isLoading: isUpdating }] =
    useUpdateFeedContentMutation();
  const [createFeedContent, { isLoading: isCreating }] =
    useCreateFeedContentMutation();

  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    // reset the form when the data changes
    form.reset({ ...defaultValues });
  }, [feedContentId]);

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await removeFeedContent(id).unwrap();
      refetchFeedContent();
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
            (errMsg as string) || "Unable to delete feed content. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            error.message || "Unable to delete feed content. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  }, []);

  const onChangePicture = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement & { files: FileList };
      const file: File = (target.files as FileList)[0];
      if (typeof file === "undefined") return;

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Unable to upload image.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [],
  );

  const updateHandler: SubmitHandler<FormSchemaProps> = useCallback(
    async (data) => {
      const newData = {
        id: feedContentId as string,
        logoFile: preview as string,
        name: data.name,
        published: data.published,
      };
      try {
        const response = await updateFeedContent(newData).unwrap();
        if (response.success) {
          refetchFeedContent();
          setOpen!(false);
          toast({
            title: "Success!",
            description: "Feed content has been updated.",
          });
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
              "Unable to update feed content. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              error.message || "Unable to update feed content Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    },
    [preview, feedContentId],
  );

  const createHandler: SubmitHandler<PartialFormSchemaProps> = useCallback(
    async (data) => {
      try {
        const response = await createFeedContent(data).unwrap();
        if (response.success) {
          refetchFeedContent();
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
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              (errMsg as string) ||
              "Unable to create feed content. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              error.message || "Unable to create feed content Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    },
    [],
  );

  return {
    feedContent,
    isLoadingFeedContent,
    isRemoving,
    isUpdating,
    isCreating,
    form,
    preview,
    refetchFeedContent,
    deleteHandler,
    onChangePicture,
    updateHandler,
    createHandler,
  };
}
