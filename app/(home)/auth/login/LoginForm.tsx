import ReCAPTCHA from 'react-google-recaptcha'
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

import useLoginController from './useLoginController'

export function LoginForm() {
  const { form, onSubmit, recaptchaRef, isLoading } = useLoginController()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            data-test="login-form-email-input"
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
          <Button
            type="submit"
            disabled={isLoading}
            data-test="login-form-button"
            className="w-full"
          >
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
