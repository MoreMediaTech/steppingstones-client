import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Paper } from '@mantine/core'
import { DistrictFormComponent } from '@components/forms'
import {
  setError,
  setPreviewSource,
  clearState,
} from 'features/upload/uploadSlice'
import { useUploadFileMutation } from 'features/upload/uploadApiSlice'
import { useCreateDistrictWhyInvestMutation, useGetDistrictByIdQuery } from 'features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { EditorFormDataProps } from '@lib/types'

const WhyInvestSection = ({ id}: {id: string}) => {
    const dispatch = useAppDispatch()
    const { previewSource, selectedFile } = useAppSelector(
      (state) => state.upload
    )
    const {
      data: districtData,
      isLoading: isLoadingDistrict,
      isError: isErrorDistrict,
    } = useGetDistrictByIdQuery(id, { refetchOnMountOrArgChange: true })
      console.log("🚀 ~ file: WhyInvestSection.tsx ~ line 26 ~ WhyInvestSection ~ districtData", districtData)
    const [createDistrictWhyInvest] = useCreateDistrictWhyInvestMutation()
    
    
    const [value, setValue] = useState(districtData?.whyInvest[0]?.content)
    const [view, setView] = useState('Preview')
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
    } = useForm<EditorFormDataProps>()
    

    const convertFileToBase64 = (file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        dispatch(setPreviewSource(reader.result))
      }
      reader.onerror = () => {
        console.error('AHHHHHHHH!!')
        dispatch(setError({ message: 'something went wrong!' }))
      }
    }

    const submitHandler: SubmitHandler<EditorFormDataProps> = useCallback(
      async (data) => {
        if (data.imageFile.length > 0) {
          convertFileToBase64(data.imageFile[0] as File)
        }
        try {
          const formData = {
            title: data.title,
            imageFile: previewSource,
            content: value,
            districtId: id,
          }
          console.log(
            '🚀 ~ file: why-invest-in.tsx ~ line 35 ~ const submitHandler:SubmitHandler<EditorFormDataProps>=useCallback ~ data',
            formData
          )
          await createDistrictWhyInvest(formData).unwrap()
          reset()
        } catch (error) {
          dispatch(setError({ message: error.message }))
        }
      },
      []
    )
  return (
    <section className="relative h-auto w-full flex-grow px-2 py-2  md:py-8 md:px-8">
      <section className="container">
        <Paper shadow="lg" p="md" radius="md" withBorder className="w-full">
            {districtData && districtData.whyInvest.length > 0 ? (
                <div></div>
            ) : (

                <DistrictFormComponent
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  isLoading={false}
                  submitHandler={submitHandler}
                  value={value}
                  setValue={setValue}
                />
            )}
        </Paper>
      </section>
    </section>
  )
}

export default WhyInvestSection
