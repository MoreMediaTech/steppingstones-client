'use client'
import React, { useCallback, useState } from 'react'
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@components/ui/use-toast'

import { useUpdateUserMutation } from 'app/global-state/features/user/usersApiSlice'
import { useUploadFileMutation } from 'app/global-state/features/upload/uploadApiSlice'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
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
import { ToastAction } from '@components/ui/toast'
import { Button } from '@components/ui/button'
import { ContentFormProps } from '@models/ContentForm'
import Image from 'next/image'

const imageUploadFormSchema = z.object({
  imageFile: z.string(),
})

type ImageUploadFormProps = z.infer<typeof imageUploadFormSchema>

type UploadImageFormProps = {
  refetch?: () => void
  type: 'user' | 'image'
  user?: Partial<UserSchemaWithIdAndOrganisationType>
  form?: UseFormReturn<ContentFormProps, any, undefined>
}

export function UploadImageForm({
  refetch,
  user,
  type,
  form,
}: UploadImageFormProps) {
  const { toast } = useToast()
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [updateUser] = useUpdateUserMutation()
  const [uploadFile] = useUploadFileMutation()
  const imageForm = useForm<ImageUploadFormProps>({
    resolver: zodResolver(imageUploadFormSchema),
  })

  const uploadFileHandler = (file: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Unable to upload image.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const file = e.target.files?.[0]
      if (file) {
        uploadFileHandler(file)
      }
    },
    []
  )

  const onSubmit: SubmitHandler<ImageUploadFormProps> = useCallback(
    async (data) => {
      const updatedImg = {
        id: user?.id,
        imageFile: preview,
      }
      try {
        if (type === 'user') {
          await updateUser(updatedImg).unwrap()
        } else if (type === 'image') {
          const response = await uploadFile(preview).unwrap()
          form?.setValue('imageUrl', response.imageUrl)
        }
        toast({
          title: 'Success!',
          description: 'Image uploaded successfully.',
        })
        setPreview(null)
        refetch!()
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Unable to upload image.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    [preview]
  )
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button">Upload Image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>Upload an image to be used.</DialogDescription>
        </DialogHeader>
        <div className="w-54 h-54">
          <Image
            src={preview as string}
            alt="preview"
            width={150}
            height={150}
          />
        </div>
        <Form {...imageForm}>
          <form
            onSubmit={imageForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={imageForm.control}
              name="imageFile"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      value={value}
                      onChange={(event) => {
                        handleChange(event)
                      }}
                      type="file"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full space-y-2">
              <DialogTrigger>
                <Button type="submit">Submit</Button>
              </DialogTrigger>
              <DialogTrigger>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setPreview(null)
                  }}
                >
                  cancel
                </Button>
              </DialogTrigger>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
