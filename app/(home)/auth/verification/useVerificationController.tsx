'use client'

import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
import ReCAPTCHA from 'react-google-recaptcha'

// redux store (Model)
import { useAuthenticateMutation } from 'app/global-state/features/auth/authApiSlice'
import { useAppDispatch } from 'app/global-state/hooks'
import { setAuthState } from 'app/global-state/features/auth/authSlice'

const formSchema = z.object({
  oneTimeCode: z.string().nonempty({
    message: 'A six digit one time code is required...',
  }),
})

export default function useVerificationController({
  email,
}: {
  email: string
}) {
  const { toast } = useToast()
  const router = useRouter()

  const dispatch = useAppDispatch()
  const [authenticate, { isLoading }] = useAuthenticateMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oneTimeCode: '',
    },
  })
  
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef?.current?.reset()
    try {
      const responseData = await authenticate({
        email: email as string,
        oneTimeCode: data.oneTimeCode,
        token: token as string,
      }).unwrap()
      if (responseData.success) {
        dispatch(
          setAuthState({ token: responseData.token, isAuthenticated: true })
        )
        localStorage.setItem('_ssapp:token', responseData.token)
        form.reset()
        router.push(`/admin-portal`)
      }
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

  return { form, onSubmit, recaptchaRef, isLoading }
}
