"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { ContentFormProps, contentFormSchema } from "@models/ContentForm";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { PartialSectionSchemaProps } from "@models/Section";

// TODO: Add the correct type for the updateOrCreate function
interface Props {
  defaultValues: PartialSectionSchemaProps & { countyId?: string };
  updateOrCreate: any;
}

export function useContentForm(
  { defaultValues, updateOrCreate }: Props,
  refetch: () => void,
) {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null,
  );
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<ContentFormProps>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: "",
      isLive: false,
      content: "",
      author: "",
      summary: "",
      imageFile: undefined,
      videoUrl: "",
      videoTitle: "",
      videoDescription: "",
    },
  });

  React.useEffect(() => {
    // reset the form when the county data is changed/updated
    form.reset({
      ...defaultValues,
    });
  }, [isEdit]);

  const onChangePicture = React.useCallback(
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

  const onSubmit: SubmitHandler<ContentFormProps> = React.useCallback(
    async (formData) => {
      try {
        const newData = {
          title: formData.title,
          content: formData.content,
          countyId: defaultValues.countyId || "",
          author: formData.author,
          summary: formData.summary,
          imageFile: preview as string,
          isLive: formData.isLive,
          videoUrl: formData.videoUrl,
          videoTitle: formData.videoTitle,
          videoDescription: formData.videoDescription,
          id: defaultValues.id as string,
        };

        const response = await updateOrCreate(newData).unwrap();
        if (response.success) {
          toast({
            title: "Success",
            description: "Content updated successfully",
          });
        }
        refetch();
        form.reset();
        setIsEdit(false);
        setPreview(null);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem updating the content.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [preview],
  );
  return { form, preview, isEdit, setIsEdit, onChangePicture, onSubmit };
}
