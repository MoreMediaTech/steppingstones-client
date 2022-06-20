import { EditImageProps } from '@lib/types'
import { Button } from '@mantine/core'
import React from 'react'
import { FieldError, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { MdCloudUpload } from 'react-icons/md'

interface IEditImageComponent {
  submitHandler: SubmitHandler<EditImageProps>
  errors: {
    imageFile?: FieldError | undefined
  }
  isLoading: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  register: UseFormRegister<EditImageProps>
  handleSubmit: UseFormHandleSubmit<EditImageProps>
}

const EditImageComponent = ({
  register,
  handleSubmit,
  submitHandler,
  errors,
  isLoading,
  setIsEdit,
}: IEditImageComponent) => {
  return (
    <form
      className="flex h-full w-full flex-col space-y-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <label htmlFor="main-image" className="flex h-full w-full">
        <div className="flex h-full w-full cursor-pointer items-center justify-center border-2 border-gray-200 p-2">
          <div className="flex h-full w-full flex-col border-4 border-dashed hover:border-gray-300 hover:bg-gray-100">
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
          className="w-full bg-red-500 hover:bg-red-600 capitalize"
          onClick={() => setIsEdit(false)}
        >
          cancel
        </Button>
      </div>
    </form>
  )
}

export default EditImageComponent