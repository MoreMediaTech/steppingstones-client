'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
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
import ReCAPTCHA from 'react-google-recaptcha'
import { env } from '@lib/env'

const formSchema = z.object({
  name: z.string().nonempty({
    message: 'Please enter your name',
  }),
  email: z
    .string()
    .nonempty({
      message: 'Please enter your email',
    })
    .email({
      message: 'Please enter a valid email',
    }),
})

type FormSchemaProps = z.infer<typeof formSchema>

export function RegisterNowForm() {
  const router = useRouter()
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null)
  const { toast } = useToast()
  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormSchemaProps> = async (data) => {
    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef?.current?.reset()
    const formData = {
      ...data,
      token: token as string,
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}feed/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      const responseData = await response.json()

      if (responseData.success) {
        toast({
          title: 'Success!',
          description: responseData.message,
        })
        router.push(`/register-now/thank-you/${data.name.split(' ')[0]}`)
        form.reset()
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'No server response. Please try again.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name<span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name..."
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
