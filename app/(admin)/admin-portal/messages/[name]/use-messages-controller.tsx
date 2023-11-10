"use client";

import React, { useCallback } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { useRouter } from "next/navigation";

// redux global state (Model)
import {
  useGetMessageByIdQuery,
  useGetFoldersWithMessagesCountQuery,
  useGetMessageInFolderMutation,
  useGetMessagesForFolderMutation,
  useUpdateMsgStatusByIdMutation,
  useSendEmailMutation,
  useDeleteMailByIdMutation,
  useDeleteManyMailMutation,
} from "app/global-state/features/messages/messagesApiSlice";
import { useGetUsersQuery } from "@global-state/features/user/usersApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  PartialMessageSchemaProps,
  partialMessageSchema,
  MessageTypes,
} from "@models/Messages";

// hooks
import { useAuthUser } from "@hooks/useAuthUser";

// utils
import { emailTemplate } from "@lib/emailTemplates";

export default function useMessagesController(
  defaultValues?: PartialMessageSchemaProps,
  messageId?: string,
) {
  const { toast } = useToast();
  const router = useRouter();

  // get signed in user
  const user = useAuthUser();

  // get all users
  const { data: users } = useGetUsersQuery();

  // define message types
  const [messageType] = React.useState<MessageTypes[]>([
    MessageTypes.EXTERNAL_MESSAGE,
    MessageTypes.INTERNAL_MESSAGE,
  ]);

  // get user email addresses
  const userEmails = users?.map((user) => {
    return {
      label: user?.email as string,
      value: user?.email as string,
    };
  }) as { label: string; value: string }[];
  const [emails, setEmails] =
    React.useState<{ label: string; value: string }[]>(userEmails);

  const { data: folders } = useGetFoldersWithMessagesCountQuery();

  // get message by id
  const {
    data: message,
    isLoading: isMessageLoading,
    refetch: refetchMessage,
  } = useGetMessageByIdQuery(messageId as string);

  // mutation hooks
  const [updateMsgStatusById] = useUpdateMsgStatusByIdMutation();
  const [sendEmail, { isLoading: isSendingEmail }] = useSendEmailMutation();
  const [getMessageInFolder] = useGetMessageInFolderMutation();
  const [getMessagesForFolder] = useGetMessagesForFolderMutation();

  const [deleteMailById, { isLoading: isDeleting }] =
    useDeleteMailByIdMutation();
  const [deleteManyMail, { isLoading: isDeletingMany }] =
    useDeleteManyMailMutation();

  // form hooks
  const form = useForm<PartialMessageSchemaProps>({
    resolver: zodResolver(partialMessageSchema),
    defaultValues: { from: user?.email, to: "", subject: "", message: "" },
  });
  // watch to get the value of input field
  const searchedEmails = useWatch({ control: form.control, name: "to" });

  // filter emails based on input value
  React.useEffect(() => {
    if (searchedEmails) {
      const filteredEmails = userEmails?.filter((userEmail) =>
        userEmail?.value.toLowerCase().includes(searchedEmails.toLowerCase())
      );
      setEmails(filteredEmails || []);
    }
  }, [searchedEmails, users]);

  // create message handler function
  const createMessageHandler: SubmitHandler<PartialMessageSchemaProps> =
    React.useCallback(async (data) => {
      const message = {
        from: user?.email as string,
        to: data.to,
        subject: data.subject,
        message: data.message,
        html: emailTemplate(data.message as string),
      };
      try {
        const response = await sendEmail(message).unwrap();

        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          form.reset({ from: user?.email, to: "", subject: "", message: "" });
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable to send message",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to send message",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    }, []);

  // suggestion clicked handler function
  const suggestionClickedHandler = (suggestion: string) => {
    form.reset({ from: user?.email, to: suggestion, subject: "", message: "" });
  };

  // update message status handler function
  const handleUpdateIsRead = React.useCallback(
    async (message: PartialMessageSchemaProps) => {
      try {
        if (!message.isRead) {
          await updateMsgStatusById({
            id: message?.id as string,
            isRead: true,
            isArchived: false,
          }).unwrap();
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description:
              (errMsg as string) || "Unable to update message status",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to update message status",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    []
  );

  // handle message response
  const handleMessageResponse: SubmitHandler<PartialMessageSchemaProps> =
    useCallback(async (data) => {
      // console.log(data);

      const message = {
        from: data.from ? data.from as string : user?.email as string,
        to: data.to,
        subject: data.subject,
        message: data.message,
        html: emailTemplate(data.message as string),
      };
      try {
        const response = await sendEmail(message).unwrap();

        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          form.reset({ from: user?.email, to: "", subject: "", message: "" });
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description: (errMsg as string) || "Unable to send message",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to send message",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    }, []);

  // delete message handler function
  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await deleteMailById(id).unwrap();
      if (response.success) {
        toast({
          title: "Success!",
          description: response.message,
        });

        router.back();
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          title: "Error!",
          description: (errMsg as string) || "Unable to delete message",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          title: "Error!",
          description: error.message || "Unable to delete message",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    }
  }, []);

  // delete many messages handler function
  const handleDeleteMany = useCallback(
    async (rows: PartialMessageSchemaProps[]) => {
      const selectedIds = rows.map((row) => row.id);
      try {
        const response = await deleteManyMail(selectedIds as string[]).unwrap();
        if (response.success) {
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
            title: "Error!",
            description: (errMsg as string) || "Unable to delete messages",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        } else if (isErrorWithMessage(error)) {
          toast({
            title: "Error!",
            description: error.message || "Unable to delete messages",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
        }
      }
    },
    []
  );

  const handleGetMessagesForFolder = useCallback(async (folderName: string) => {
    try {
      const response = await getMessagesForFolder({ folderName }).unwrap();
      return response;
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          title: "Error!",
          description: (errMsg as string) || "Unable to get messages",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          title: "Error!",
          description: error.message || "Unable to get messages",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    }
  }, []);

  const handleGetMessageInFolder = useCallback(async (folderName: string, messageId: string) => {
    try {
      const response = await getMessageInFolder({ folderName, messageId }).unwrap();
      return response;
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          title: "Error!",
          description: (errMsg as string) || "Unable to get message",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          title: "Error!",
          description: error.message || "Unable to get message",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    }
  }, []);

  return {
    folders,
    message,
    emails,
    form,
    messageType,
    isMessageLoading,
    isSendingEmail,
    isDeleting,
    isDeletingMany,
    createMessageHandler,
    suggestionClickedHandler,
    handleMessageResponse,
    handleUpdateIsRead,
    handleDelete,
    handleDeleteMany,
    handleGetMessagesForFolder,
    handleGetMessageInFolder,
  };
}
