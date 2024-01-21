'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

// redux global state (Model)
import { 
    useGetAdvertsQuery, 
    useGetAdvertsByIdQuery,
    useCreateAdvertMutation,
    useUpdateAdvertMutation,
    useDeleteAdvertMutation, 
} from "@global-state/features/adverts/advertsApiSlice"

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { AdvertSchemaProps, PartialAdvertSchemaProps, partialAdvertSchema } from '@models/Advert';



export default function useAdsSectionController( defaultValues?: PartialAdvertSchemaProps, id?: string) {
     const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null
  );
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const { toast } = useToast();

  //get all adverts
    const { data, error, isLoading: isLoadingAds , refetch } = useGetAdvertsQuery(undefined);
    //get advert by id
    const { data: advert, error: advertError, isLoading: isLoadingAdvert } = useGetAdvertsByIdQuery(id as string, {
        skip: !id,
    });

    //create advert
    const [createAdvert, { isLoading: isCreating }] = useCreateAdvertMutation();
    //update advert
    const [updateAdvert, { isLoading: isUpdating }] = useUpdateAdvertMutation();
    //delete advert
    const [deleteAdvert, { isLoading: isDeleting }] = useDeleteAdvertMutation();

  const form = useForm<AdvertSchemaProps>({
    resolver: zodResolver(partialAdvertSchema),
    defaultValues: {
      title: "",
      published: false,
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
    []
  );

  const createAdHandler: SubmitHandler<AdvertSchemaProps> = React.useCallback(
    async (formData) => {
      try {
        const newData = {
          title: formData.title,
          published: formData.published,
          author: formData.author,
          summary: formData.summary,
          imageFile: preview as string,
          videoUrl: formData.videoUrl,
          videoTitle: formData.videoTitle,
          videoDescription: formData.videoDescription,
        };

        const response = await createAdvert(newData).unwrap();
        if (response.success) {
          toast({
            title: "Success",
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
          description: "There was a problem updating the Advert.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [preview]
  );

    const updateAdHandler: SubmitHandler<AdvertSchemaProps> = React.useCallback(
    async (formData) => {
      try {
        const newData = {
          title: formData.title,
          published: formData.published,
          author: formData.author,
          summary: formData.summary,
          imageFile: preview as string,
          videoUrl: formData.videoUrl,
          videoTitle: formData.videoTitle,
          videoDescription: formData.videoDescription,
          id: defaultValues?.id,
        };

        const response = await updateAdvert(newData).unwrap();
        if (response.success) {
          toast({
            title: "Success",
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
          description: "There was a problem updating the Advert.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [preview]
  );

    const deleteAdHandler = React.useCallback(
    async (id: string) => {
      try {

        const response = await deleteAdvert(id).unwrap();
        if (response.success) {
          toast({
            title: "Success",
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
          description: "There was a problem updating the Advert.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [preview]
  );
  return {data, advert, isCreating, isDeleting, isLoadingAds, isLoadingAdvert, isUpdating, form, preview, isEdit, setIsEdit, onChangePicture, createAdHandler, updateAdHandler, deleteAdHandler};
};