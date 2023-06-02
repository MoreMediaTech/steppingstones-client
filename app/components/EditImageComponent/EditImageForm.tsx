'use client'
import { Button } from '@mantine/core'
import Image from 'next/image'
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import Spinner from 'app/components/spinner'
import { EditImageProps } from '@lib/types'

interface IEditImageComponent {
  submitHandler: SubmitHandler<EditImageProps>
  errors: {
    imageFile?:
      | Merge<FieldError, FieldErrorsImpl<DeepRequired<FileList>>>
      | undefined
  }
  isLoading: boolean
  preview: string | ArrayBuffer | null
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  register: UseFormRegister<EditImageProps>
  handleSubmit: UseFormHandleSubmit<EditImageProps>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditImageComponent = ({
  register,
  handleSubmit,
  submitHandler,
  errors,
  isLoading,
  setIsEdit,
  preview,
  setPreview,
  handleChange,
}: IEditImageComponent) => {
  return (
    <form
      className="flex h-full w-full flex-col space-y-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex w-full flex-col items-center justify-center bg-slate-50 p-3 lg:flex-row  ">
        <div className="flex h-full w-full cursor-pointer items-center justify-center border-2 border-gray-200 p-2">
          <div className="flex h-full w-full cursor-pointer flex-col border-4 border-dashed hover:border-gray-300 hover:bg-gray-100">
            {isLoading ? (
              <Spinner message="Uploading..." classes="w-12 h-12" />
            ) : !preview ? (
              <label htmlFor="main-image" className="cursor-pointer">
                <div className="flex h-full flex-col items-center justify-center px-6 py-8">
                  <div className="flex flex-col items-center justify-center ">
                    <p className="cursor-pointer text-2xl font-bold">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload pictures</p>
                  </div>
                  <p className=" text-center text-gray-400">
                    Use high-quality JPG, PNG less than 10 MB
                  </p>
                </div>
                <input
                  id="main-image"
                  aria-label="main-image"
                  type="file"
                  {...register('imageFile', {
                    onChange: (e) => handleChange(e),
                  })}
                  className="h-0 w-0"
                />
              </label>
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  src={preview as string}
                  alt="Image preview"
                  className="rounded-t-lg"
                  width={400}
                  height={400}
                  quality={50}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {errors.imageFile && (
          <p className="text-red-500">{errors.imageFile?.message}</p>
        )}
      </div>
      <div className="w-full space-y-2">
        <Button
          type="submit"
          fullWidth
          className="w-full bg-blue-500"
          loading={isLoading}
        >
          Submit
        </Button>
        <Button
          type="button"
          fullWidth
          className="w-full bg-red-500 capitalize hover:bg-red-600"
          onClick={() => {
            setIsEdit(false)
            setPreview(null)
          }}
        >
          cancel
        </Button>
      </div>
    </form>
  )
}

export default EditImageComponent
