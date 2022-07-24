import { Button, Divider, Indicator, Textarea, TextInput } from '@mantine/core'
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { MdCloudUpload } from 'react-icons/md'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { EditorFormDataProps } from '@lib/types'
import { clearState } from 'features/upload/uploadSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
const RichTextEditor = dynamic(() => import('@components/RichText'), {
  ssr: false,
})


interface IContentFormComponent {
  submitHandler: SubmitHandler<EditorFormDataProps>
  errors: {
    title?: FieldError | undefined
    content?: FieldError | undefined
  }
  value: string
  preview: string | ArrayBuffer | null
  setValue: React.Dispatch<React.SetStateAction<string>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setPreview: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >
  isLoading: boolean
  register: UseFormRegister<EditorFormDataProps>
  handleSubmit: UseFormHandleSubmit<EditorFormDataProps>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ContentFormComponent = ({
  submitHandler,
  errors,
  isLoading,
  register,
  value,
  preview,
  setValue,
  handleSubmit,
  setIsEdit,
  handleChange,
  setPreview,
}: IContentFormComponent) => {

  return (
    <form className="space-y-8" onSubmit={handleSubmit(submitHandler)}>
      <div className="p-2 font-semibold">
        <h1>Content</h1>
      </div>
      <Divider />
      <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
        <label htmlFor="title" className="w-1/4">
          Title<span className="ml-1 text-red-500">*</span>
        </label>
        <TextInput
          id="title"
          aria-label="title"
          placeholder="Enter Title"
          className="w-full"
          {...register('title', {
            required: true,
            minLength: {
              value: 2,
              message:
                'Please enter a title with at least 2 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%?:/^&*()._ -]+$/,
              message: 'Please enter a valid title name',
            },
          })}
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col justify-between md:flex-row ">
        <label htmlFor="content" className="w-1/4">
          Content:
        </label>
        <RichTextEditor value={value} setValue={setValue} />
      </div>
      <Divider />
      <div className="my-4 flex w-full items-center justify-between ">
        <div>
          <Button
            type="button"
            fullWidth
            className=" rounded-md border border-red-700 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>
        </div>
        <div className="flex w-full items-center md:w-2/5">
          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            className=" rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ContentFormComponent
