'use client'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import RichTextEditor from '@components/RichText'
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
import { ContentFormProps } from '@models/ContentForm'
import Image from 'next/image'

interface IContentForm {
  form: UseFormReturn<ContentFormProps, any, undefined>
  isLoading: boolean
  preview: string | ArrayBuffer | null
  onSubmit: SubmitHandler<ContentFormProps>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  onChangePicture: (event: React.FormEvent<HTMLInputElement>) => void
}

export const ContentForm = ({
  isLoading,
  form,
  preview,
  onSubmit,
  setIsEdit,
  onChangePicture,
}: IContentForm) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="isLive"
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
                    Is Section Live? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>
                    Confirm if the section is live
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
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    {...field}
                    onChange={onChangePicture}
                  />
                </FormControl>
                <FormDescription>Upload an image to be used.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="Summary" {...field} />
                </FormControl>
                <FormDescription>
                  A short summary of the content
                </FormDescription>
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
                  The url of the video you want to add to the content
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
                  The title of the video you want to add to the content
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
                  A short description of the video you want to add to the content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor field={field} />
                </FormControl>
                <FormDescription>
                  The content of the section you want to create
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="my-4 flex w-full items-center justify-between ">
            <Button
              type="button"
              className=" rounded-md border border-red-700 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={() => {
                setIsEdit(false)
                form.reset()
              }}
            >
              Cancel
            </Button>

            <Button type="submit">{isLoading ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
