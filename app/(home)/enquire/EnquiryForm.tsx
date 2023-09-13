'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import { useTheme } from 'next-themes'

// components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'

import useEnquiryController from './useEnquiryController'

export function EnquiryForm() {
  const { theme } = useTheme()

  const { form, onSubmit, isLoading, recaptchaRef } = useEnquiryController()

  return (
    <div className='md:px-12 py-6 w-full mt-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mt-4 md:mt-6 px-2 py-6">
          <div className="space-y-2">
            <h1 data-test="enquire-page-title" className="text-lg font-bold ">
              Leave a message
            </h1>
            <p className="text-tertiary text-justify text-sm font-normal font-montserrat">
              Fill the form and we will respond as soon as we can.
              Alternatively, you can reach out to us at{' '}
              <a
                href="mailto:admin@steppingstonesapp.com"
                className="text-primary-dark-100 dark:text-primary-light-100 underline font-semibold"
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

          <Button disabled={isLoading}  type="submit">
            {isLoading ? 'Sending...' : 'Send enquiry'}
          </Button>
          {/* <p className="text-justify text-sm font-normal text-gray-500">
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
          </p> */}
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
