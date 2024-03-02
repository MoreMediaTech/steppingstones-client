"use client";

import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import ReCAPTCHA from "react-google-recaptcha";

// redux store (Model)
import { useAuthenticateMutation } from "app/global-state/features/auth/authApiSlice";
import { useAppDispatch } from "app/global-state/hooks";
import { setAuthState } from "app/global-state/features/auth/authSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

const formSchema = z.object({
  oneTimeCode: z.string().min(6, {
    message: "A six digit one time code is required...",
  }),
});

export default function useVerificationController({
  email,
}: {
  email: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [authenticate, { isLoading }] = useAuthenticateMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oneTimeCode: "",
    },
  });

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef?.current?.reset();
    try {
      const responseData = await authenticate({
        email: email as string,
        oneTimeCode: data.oneTimeCode,
        token: token as string,
      }).unwrap();
      if (responseData.success) {
        dispatch(setAuthState({ isAuthenticated: true }));

        form.reset();
        router.push(`/admin-portal`);
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          "error" in error ? error.message : JSON.stringify(error.message);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: (errMsg as string) || "Login failed. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else if (isErrorWithMessage(error)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message || "Unauthorised. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  return { form, onSubmit, recaptchaRef, isLoading };
}
