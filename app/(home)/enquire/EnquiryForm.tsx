'use client'
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import ReCAPTCHA from 'react-google-recaptcha'
import { useTheme } from 'next-themes'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'

import { useSendEnquiryMutation } from 'app/global-state/features/messages/messagesApiSlice'
import { enquiryEmailTemplate } from '@lib/emailTemplates'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'

const formSchema = z.object({
  from: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().nonempty({ message: 'Subject is required' }),
  message: z.string().nonempty({ message: 'Message is required' }),
  company: z.string().nonempty({ message: 'Company is required' }),
})

type FormSchemaProps = z.infer<typeof formSchema>

export function EnquiryForm() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [sendEnquiry, { isLoading }] = useSendEnquiryMutation()
  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(formSchema),
  })
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const onSubmit: SubmitHandler<FormSchemaProps> = async (data) => {
    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef?.current?.reset()
    const message = {
      from: data.from,
      to: 'enquiries@steppingstonesapp.com',
      subject: data.subject,
      company: data.company,
      html: enquiryEmailTemplate(data.subject, data.message),
      token,
      message: data.message,
    }
    try {
      await sendEnquiry(message).unwrap()
      form.reset()
      toast({
        title: 'Enquiry sent.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem sending your enquiry.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <div className='p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 md:mt-6 px-2 py-6">
          <div className="space-y-2">
            <h1 className="text-xl font-bold ">
              Leave a message
            </h1>
            <p className="text-tertiary text-justify font-normal font-montserrat">
              Fill the form and we will respond as soon as we can.
              Alternatively, you can reach out to us at{' '}
              <a
                href="mailto:admin@steppingstonesapp.com"
                className="text-primary-dark-100 dark:text-primary-light-100 font-semibold"
              >
                our email address
              </a>
            </p>
          </div>
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>
                <FormDescription>
                  We will use this email address to contact you
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="subject..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enquiry</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your enquiry..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button  type="submit">
            {isLoading ? 'Sending...' : 'Send enquiry'}
          </Button>
          <p className="text-justify text-sm font-normal text-gray-500">
            This site is protected by reCAPTCHA and the Google{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_"
              className="underline"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://policies.google.com/terms"
              target="_"
              className="underline"
            >
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </form>
      </Form>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        theme={theme === 'dark' ? 'dark' : 'light'}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      />
    </div>
  )
}
