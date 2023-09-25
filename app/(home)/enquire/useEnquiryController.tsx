"use client";
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import ReCAPTCHA from 'react-google-recaptcha'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'

// global state (Model)
import { useSendEnquiryMutation } from 'app/global-state/features/messages/messagesApiSlice'

// lib
import { enquiryEmailTemplate } from '@lib/emailTemplates';
import { EnquiryEmail } from '../../../emails/enquiry-email'

const formSchema = z.object({
  from: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().nonempty({ message: 'Subject is required' }),
  message: z.string().nonempty({ message: 'Message is required' }),
  company: z.string().nonempty({ message: 'Company is required' }),
})

type FormSchemaProps = z.infer<typeof formSchema>

export default function useEnquiryController() {
      const { toast } = useToast()
      const [sendEnquiry, { isLoading }] = useSendEnquiryMutation()
      const form = useForm<FormSchemaProps>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          from: '',
          company: '',
          subject: '',
          message: '',
        }
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
          html: enquiryEmailTemplate(data.from, data.message),
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

        return {
            onSubmit,
            isLoading,
            form,
            recaptchaRef,
        }
};
