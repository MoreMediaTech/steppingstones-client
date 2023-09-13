"use client";

import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
import ReCAPTCHA from 'react-google-recaptcha';

// redux store (Model)
import { useLoginMutation } from 'app/global-state/features/auth/authApiSlice'

const formSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Please enter your email',
    })
    .email({
      message: 'Please enter a valid email',
    }),
})



export default function useLoginController() {
    const { toast } = useToast()
    const router = useRouter()

    // login mutation from redux store
    const [login, { isLoading }] = useLoginMutation()

    // react hook form for form actions and validation
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })

    // ref for reCAPTCHA
    const recaptchaRef = useRef<ReCAPTCHA | null>(null)

    // submit handler to handle form submission
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
      data
    ) => {
      const token = await recaptchaRef.current?.executeAsync()
      recaptchaRef?.current?.reset()
      try {
        const responseData = await login({
          email: data.email,
          token: token as string,
        }).unwrap()
        toast({
          title: 'Success!',
          description: responseData.message,
        })
        form.reset()
        router.push('/auth/verification?email=' + data.email)
      } catch (error) {
        if (!error?.response) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'No server response. Please try again.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        } else if (error.response?.status === 400) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Invalid credentials. Please try again.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        } else if (error.response?.status === 401) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Unauthorised. Please try again.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Login failed. Please try again.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
      }
    }

    return {
        form,
        onSubmit,
        recaptchaRef,
        isLoading
    }

}
