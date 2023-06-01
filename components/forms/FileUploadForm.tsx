'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  setPreviewSource,
  setError,
} from 'app/global-state/features/upload/uploadSlice'
import { useUploadFileMutation } from 'app/global-state/features/upload/uploadApiSlice'
import Spinner from '@components/spinner'
import Image from 'next/image'
import { MdCloudUpload } from 'react-icons/md'

const FileUploadForm = () => {
  const { previewSource, selectedFile } = useAppSelector(
    (state) => state.upload
  )
  const dispatch = useAppDispatch()
  const [uploadFile, { isLoading, isSuccess }] = useUploadFileMutation()

  // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return
  //   const file = e.target?.files[0]
  //   previewFile(file)
  //   dispatch(setSelectedFile(file))
  // }

  const previewFile = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      dispatch(setPreviewSource(reader.result))
    }
  }

  const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedFile || selectedFile === null) return
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => {
      uploadImage(reader.result)
    }
    reader.onerror = () => {
      console.error('AHHHHHHHH!!')
      dispatch(setError({ message: 'something went wrong!' }))
    }
  }

  const uploadImage = async (
    base64EncodedImage: string | ArrayBuffer | null
  ) => {
    if (base64EncodedImage === null) {
      dispatch(setError({ message: 'something went wrong!' }))
    }
    try {
      const response = await uploadFile(base64EncodedImage).unwrap()
      if (isSuccess) {
        console.log(
          '🚀 ~ file: FileUploadForm.tsx ~ line 48 ~ uploadImage ~ response',
          response
        )
      }
    } catch (err) {
      console.error(err)
      dispatch(setError({ message: 'Something went wrong!' }))
    }
  }
  return (
    <>
      {isLoading && <Spinner classes="w-24 h-24" message="Uploading..." />}
      {previewSource && (
        <div className="w-54 h-54">
          <Image
            src={previewSource as string}
            alt="preview"
            width={150}
            height={150}
          />
        </div>
      )}
      <form onSubmit={handleSubmitFile}>
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
                  />
                </div>
              </div>
            </div>
          </label>
        </div>
      </form>
    </>
  )
}

export default FileUploadForm
