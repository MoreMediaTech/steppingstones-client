import { Button, Divider, Indicator, Textarea, TextInput } from '@mantine/core'
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { MdCloudUpload } from 'react-icons/md'
import Image from 'next/image'

import RichText from '@components/RichText'
import { EditorFormDataProps } from '@lib/types'
import { clearState } from 'features/upload/uploadSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

interface IDistrictFormComponent {
  submitHandler: SubmitHandler<EditorFormDataProps>
  errors: {
    intro?: FieldError | undefined
    title?: FieldError | undefined
    imageFile?: FieldError | undefined
    content?: FieldError | undefined
  }
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  register: UseFormRegister<EditorFormDataProps>
  handleSubmit: UseFormHandleSubmit<EditorFormDataProps>
}

const DistrictFormComponent = ({
  submitHandler,
  errors,
  isLoading,
  register,
  value,
  setValue,
  handleSubmit,
  setIsEdit,
}: IDistrictFormComponent) => {
  const dispatch = useAppDispatch()
  const { previewSource } = useAppSelector((state) => state.upload)
  return (
    <form className="space-y-8" onSubmit={handleSubmit(submitHandler)}>
      <div className="p-2 font-semibold">
        <h1>Content</h1>
      </div>
      <Divider />
      <div className="flex w-full flex-col justify-between md:flex-row">
        <label htmlFor="intro" className="w-1/4">
          Intro
        </label>
        <Textarea
          id="intro"
          aria-label="intro"
          placeholder="Enter Intro"
          className="w-full"
          autosize
          minRows={3}
          {...register('intro', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
        />
      </div>
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
                'Please enter a District name with at least 2 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col justify-between md:flex-row ">
        <label htmlFor="main-image" className="flex w-1/4">
          Main Image
        </label>
        {previewSource ? (
          <div className="flex w-full justify-start">
            <div className="flex flex-col space-y-2">
              <Image
                src={previewSource as string}
                alt="preview"
                width={150}
                height={150}
              />
              <Button
                type="button"
                onClick={() => dispatch(clearState())}
                className="w-54 bg-blue-500"
              >
                delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-start">
            <label htmlFor="main-image" className="flex w-full">
              <div className="flex w-1/4 cursor-pointer items-center justify-center border-2 border-gray-200 p-2">
                <div className="flex h-32 w-full flex-col border-4 border-dashed hover:border-gray-300 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <MdCloudUpload className="text-gray-300" fontSize={44} />
                    <p className="text-gray-300">Select Image</p>
                    <input
                      id="main-image"
                      type="file"
                      accept="image/*"
                      aria-label="main-image"
                      className="w-full cursor-pointer opacity-0"
                      {...register('imageFile')}
                    />
                  </div>
                </div>
              </div>
            </label>
          </div>
        )}
      </div>
      <Divider />
      <div className="flex w-full flex-col justify-between md:flex-row ">
        <label htmlFor="title" className="w-1/4">
          Content:
        </label>
        <RichText
          controls={[
            ['bold', 'italic', 'underline', 'link', 'image'],
            ['unorderedList', 'h1', 'h2', 'h3'],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
          id="title"
          aria-label="title"
          className="w-full"
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="my-4 flex w-full  md:justify-end ">
        <div>
          <Button
            type="button"
            fullWidth
            className=" rounded-sm border border-red-700 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>
        </div>
        <div className="flex w-full items-center space-x-4">
          <div className="w-full text-gray-400">
            <p>Save and preview</p>
          </div>
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

export default DistrictFormComponent
