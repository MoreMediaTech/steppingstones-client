"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Role,
  UserSchemaWithIdType,
  partialUserSchema,
  PartialUserSchemaType,
  PartialUserWithIdType,
} from "@models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";

// redux global state (Model)
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@global-state/features/user/usersApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

export default function useUsersController(
  defaultValues?: PartialUserSchemaType,
  user?: PartialUserWithIdType,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [roles] = useState<Role[]>([
    Role.USER,
    Role.EDITOR,
    Role.PARTNER,
    Role.ADMIN,
    Role.SUPERADMIN,
  ]);

  const { data: users, isLoading, refetch } = useGetUsersQuery();
  const { toast } = useToast();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const form = useForm<PartialUserSchemaType>({
    resolver: zodResolver(partialUserSchema),
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<PartialUserSchemaType> = useCallback(
    async (data) => {
      try {
        const response = await createUser(
          data as UserSchemaWithIdType
        ).unwrap();
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
            description: (errMsg as string) || "Unable create user",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message,
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    [createUser, refetch]
  );

  useEffect(() => {
    // reset the form when the user changes
    form.reset({ ...defaultValues });
  }, []);

  const onSubmitUpdate: SubmitHandler<PartialUserSchemaType> = useCallback(
    async (data) => {
      const newData = {
        id: user?.id as string,
        ...data,
      };
      try {
        const response = await updateUser(
          newData as UserSchemaWithIdType
        ).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          refetch();
          setOpen!(false);
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable update user",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message,
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    []
  );

  return {
    users,
    isLoading,
    isCreating,
    isUpdating,
    form,
    roles,
    onSubmit,
    onSubmitUpdate,
  };
}
