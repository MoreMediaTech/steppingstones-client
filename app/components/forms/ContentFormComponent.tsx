'use client'
import { Button, Divider, TextInput } from '@mantine/core'
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

import { EditorFormDataProps } from '@lib/types'
import RichTextEditor from 'app/components/RichText'
import { Suspense } from 'react'

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
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
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
  setValue,
  handleSubmit,
  setIsEdit,
}: IContentFormComponent) => {
  return (
    <form className="my-4 space-y-8" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex w-full flex-row items-center ">
        <label className=" w-1/4 text-sm font-semibold text-gray-900">
          Is Section Live? <span className="text-red-500">*</span>
        </label>
        <input
          type="checkbox"
          {...register('isLive')}
          className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
        />
      </div>
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
              message: 'Please enter a title with at least 2 characters',
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
        <Suspense fallback={<div>Loading...</div>}>
          <RichTextEditor value={value} setValue={setValue} />
        </Suspense>
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
