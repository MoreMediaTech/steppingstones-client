'use client'
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import ReCAPTCHA from 'react-google-recaptcha'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'

import { useAuthenticateMutation } from 'app/global-state/features/auth/authApiSlice'

import { useAppDispatch } from 'app/global-state/hooks'
import { setCredentials } from 'app/global-state/features/auth/authSlice'
import usePersist from '@hooks/usePersist'

const formSchema = z.object({
  oneTimeCode: z
    .string()
    .nonempty({
      message: 'Please enter your email',
    })
})

export default function VerificationForm() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const dispatch = useAppDispatch()
  const [authenticate, { isLoading }] = useAuthenticateMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
      dispatch(setCredentials({ token: responseData.token }))
      localStorage.setItem('token', responseData.token)
      form.reset()
      router.push(`/admin-portal`)
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

  // const handleToggle = () =>
  //   setPersist((prev: boolean) => !prev) as React.Dispatch<
  //     React.SetStateAction<boolean>
  //   >
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="oneTimeCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  One Time Code<span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter one time code..."
                    {...field}
                    className="border-gray-900 dark:border-gray-200"
                  />
                </FormControl>
                <FormDescription>
                  Please enter the one time code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        />
      </Form>
    </>
  )
}
