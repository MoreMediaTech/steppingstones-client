'use client'
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
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


export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)


  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email<span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email..."
                    {...field}
                    className="border-gray-900 dark:border-gray-200"
                  />
                </FormControl>
                <FormDescription>
                  Please enter your email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
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
