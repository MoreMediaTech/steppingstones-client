'use client'
import { useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useUpdateCountyMutation } from 'app/global-state/features/editor/editorApiSlice'
import { ToastAction } from '@components/ui/toast'
import { useToast } from '@components/ui/use-toast'
import { CountyDataProps, IFormData } from '@lib/types'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Checkbox } from '@components/ui/checkbox'
import { ScrollArea } from '@components/ui/scroll-area'
import { Button } from '@components/ui/button'

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  published: z.boolean().optional(),
  logoFile: z.string().optional(),
})

type FormSchemaProps = z.infer<typeof formSchema>

type Props = {
  buttonTitle: React.ReactNode
  county: CountyDataProps | null
  refetch: () => void
}

export function UpdateCountyForm({ refetch, county, buttonTitle }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [open, setOpen] = useState(false)
  const [updateCounty] = useUpdateCountyMutation()

  const defaultValues = {
    name: county?.name ? (county?.name as string) : '',
    published: county?.published ? (county?.published as boolean) : false,
  }

  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  })

  useEffect(() => {
    // reset the form when the user changes
    form.reset({ ...defaultValues })
  }, [])

  const onChangePicture = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement & { files: FileList }
      const file: File = (target.files as FileList)[0]
      if (typeof file === 'undefined') return

      try {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Unable to upload image.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    []
  )

  const onSubmit: SubmitHandler<FormSchemaProps> = useCallback(
    async (data) => {
      const newData = {
        id: county?.id as string,
        logoFile: preview as string,
        name: data.name,
        published: data.published,
      }
      try {
        const response = await updateCounty(newData).unwrap()
        if (response.success) {
          refetch()
          router.replace('/admin-portal/admin/county-setting')
          toast({
            title: 'County updated.',
            description: 'County has been updated.',
          })
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem updating the county.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    [preview]
  )

  return (
    <>
      <Dialog>
        <Button
          type="button"
          variant="ghost"
          asChild
          className="flex w-full items-center justify-start border-gray-900 dark:border-gray-200"
        >
          <DialogTrigger>{buttonTitle}</DialogTrigger>
        </Button>
        <DialogContent className="h-[70vh] w-[60vw]">
          <DialogHeader>
            <DialogTitle>Update County Details</DialogTitle>
            <DialogDescription>
              Update the county details below
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="w-full p-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 px-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name that will be displayed on your profile
                        and in emails.
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
                  name="logoFile"
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
                      <FormDescription>
                        Upload an image to be used.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          Publish<span className="text-red">*</span>
                        </FormLabel>
                        <FormDescription>
                          This will publish the county to the public
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                  <Button type="submit" className="w-full">
                <DialogTrigger>
                    Update
                </DialogTrigger>
                  </Button>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
