"use client";

import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { OTPInput } from "input-otp";

// components
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";

import { Slot } from "@components/otp-input/slot";
import { FakeDash } from "@components/otp-input/fake-dash";

import useVerificationController from "./useVerificationController";

export default function VerificationForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { form, onSubmit, recaptchaRef, isLoading } = useVerificationController(
    { email: email as string },
  );

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
                  <OTPInput
                    {...field}
                    maxLength={6}
                    containerClassName="group flex items-center has-[:disabled]:opacity-30"
                    render={({ slots }) => (
                      <>
                        <div className="flex">
                          {slots.slice(0, 3).map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>

                        <FakeDash />

                        <div className="flex">
                          {slots.slice(3).map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>
                      </>
                    )}
                  />
                </FormControl>
                <FormDescription>
                  Please enter the one time code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            data-testid="verification-form-button"
            disabled={isLoading}
            className="w-full"
          >
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
  );
}
