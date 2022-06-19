import React from 'react'
import { Button } from '@mantine/core'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  setPreviewSource,
  setError,
  setSelectedFile,
} from 'features/upload/uploadSlice'
import { useUploadFileMutation } from 'features/upload/uploadApiSlice'
import Spinner from '@components/spinner'
import Image from 'next/image'

const FileUploadForm = () => {
  const {  previewSource, selectedFile } = useAppSelector(
    (state) => state.upload
  )
  const dispatch = useAppDispatch()
  const [uploadFile, { isLoading, isSuccess }] = useUploadFileMutation()

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target?.files[0]
    previewFile(file)
    dispatch(setSelectedFile(file))
  }

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
        <input type="file" onChange={handleFileInputChange} />
        <button type="submit" className='border border-blue-500 px-4 py-2 bg-blue-500 text-white'>Upload</button>
      </form>
    </>
  )
}

export default FileUploadForm
