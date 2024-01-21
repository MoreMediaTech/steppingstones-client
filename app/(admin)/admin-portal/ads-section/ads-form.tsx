'use client'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import Image from 'next/image'

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
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Textarea } from '@components/ui/textarea'
import Loader from '@components/Loader'

// zod schemas
import { AdvertSchemaProps } from '@models/Advert'

interface IAdsForm {
  form: UseFormReturn<AdvertSchemaProps, any, undefined>
  isLoading: boolean
  preview: string | ArrayBuffer | null
  buttonTitle?: string
  onSubmit: SubmitHandler<AdvertSchemaProps>
  onChangePicture: (event: React.FormEvent<HTMLInputElement>) => void
}

export const AdsForm = ({
  isLoading,
  form,
  preview,
  buttonTitle,
  onSubmit,
  onChangePicture,
}: IAdsForm) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(event) =>
                      field.onChange(event as boolean)
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Publish? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>
                    Confirm if the section is to be published
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of the content you want to create
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter an Author's name" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the author of the content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-full">
            {preview ? (
              <Image
                src={preview as string}
                alt="preview"
                width={250}
                height={250}
              />
            ) : null}
          </div>
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Advert Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    {...field}
                    onChange={onChangePicture}
                  />
                </FormControl>
                <FormDescription>Upload the Advert image to be used.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Url</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a video url" {...field} />
                </FormControl>
                <FormDescription>
                  The url of the Advert video you want to add to the content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a video title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of the Advert video you want to add
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter a description" {...field} />
                </FormControl>
                <FormDescription>
                  A short description of the Advert video
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advert Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="Summary" {...field} />
                </FormControl>
                <FormDescription>
                  A short summary of the Advert
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="my-4 flex w-full items-center justify-between ">
            <Button type="submit">{isLoading ? (<><Loader className="w-4 h-4 mr-2" /> <span>Creating...</span></> ) : buttonTitle}</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
