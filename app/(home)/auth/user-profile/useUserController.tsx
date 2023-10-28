'use client';

import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// redux store (Model)
import { useUpdateUserMutation } from "app/global-state/features/user/usersApiSlice";
import { useGetUserQuery } from "app/global-state/features/user/usersApiSlice";
import { useVerifyEmailMutation } from "app/global-state/features/auth/authApiSlice";
import { useAppSelector } from "@app/global-state/hooks";
import { authSelector } from "@app/global-state/features/auth/authSlice";

// components
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";

// zod schema
import {
  UserSchemaType,
  UserSchema,
  Role,
  UserSchemaWithIdType,
} from "@models/User";

export default function useUserController(defaultValues?: UserSchemaType) {
    const { toast } = useToast();
    const [roles] = useState<Role[]>([
      Role.USER,
      Role.EDITOR,
      Role.PARTNER,
      Role.ADMIN,
      Role.SUPERADMIN,
    ]);
    const [responseMessage, setResponseMessage] = useState<string>("");
  const { isAuthenticated } = useAppSelector(authSelector);

     const { data: user, isLoading: isLoadingUser, refetch } = useGetUserQuery(
      undefined,{
        skip: !isAuthenticated,
      }
     );
     const [verifyEmail, { isSuccess }] = useVerifyEmailMutation();

     const form = useForm<UserSchemaType>({
       resolver: zodResolver(UserSchema),
       defaultValues: { ...defaultValues },
     });
     const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

     useEffect(() => {
       // reset the form when the user changes
       form.reset({ ...defaultValues });
     }, [user]);

     const updateUserHandler: SubmitHandler<UserSchemaType> = useCallback(
       async (data) => {
         const newData = {
           id: user?.id as string,
           ...data,
         };
         try {
           await updateUser(newData as UserSchemaWithIdType).unwrap();
           refetch();
           toast({
             title: "User updated",
             description: "User updated successfully",
           });
         } catch (error) {
           toast({
             title: "Error",
             description: error.message,
             action: <ToastAction altText="Try again">Try again</ToastAction>,
           });
         }
       },
       []
     );

      const verifyEmailHandler = useCallback(async () => {
        try {
          const response = await verifyEmail({
            id: user?.id,
            name: user?.name,
            email: user?.email,
          }).unwrap();
          if (response?.success) {
            setResponseMessage(response?.message);
            toast({
              title: "Success!",
              description: response?.message,
            });
          }
        } catch (error: any) {
          toast({
            title: "Error!",
            description: error?.data?.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }, []);

     return { form, isLoadingUser, isUpdatingUser, isSuccess, refetch, roles, responseMessage, user, updateUserHandler, verifyEmailHandler };
};