import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/router'

import { ContentFormComponent } from '@components/forms'
import { setError, setPreviewSource } from 'features/upload/uploadSlice'
import {
  useUpdateOrCreateDistrictWhyInvestInMutation,
  useGetDistrictByIdQuery,
} from 'features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from '@components/ContentPreview'
import Spinner from '@components/spinner'
import { NEXT_URL } from '@config/index'

const WhyInvestSection = ({ id }: { id: string }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { previewSource } = useAppSelector((state) => state.upload)
  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
  } = useGetDistrictByIdQuery(id)
  const [updateOrCreateDistrictWhyInvestIn, { isLoading }] =
    useUpdateOrCreateDistrictWhyInvestInMutation()

  const [value, setValue] = useState(districtData?.whyInvest?.content)
  const [isEdit, setIsEdit] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditorFormDataProps>({
    defaultValues: {
      title: districtData?.whyInvest?.title,
    },
  })

  const convertFileToBase64 = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      dispatch(setPreviewSource(reader.result))
    }
    reader.onerror = () => {
      showNotification({
        message: 'Error converting file to base64',
        color: 'red',
      })
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
          id: districtData?.whyInvest?.id,
        }
        await updateOrCreateDistrictWhyInvestIn(formData).unwrap()
        reset()
        router.replace({
          pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district`,
          query: { ...router.query },
        })
        
      } catch (error) {
        dispatch(setError({ message: error.message }))
      }
    },
    []
  )
  return (
    <section className="relative h-auto w-full flex-grow px-2 py-2  md:py-8 md:px-8">
      <section className="container">
        {isLoadingDistrict ? (
          <Spinner classes="w-24 h-24" message="Loading..." />
        ) : (
          <Paper shadow="lg" p="md" radius="md" withBorder className="w-full">
            <div className="flex w-full justify-end">
              <UnstyledButton
                type="button"
                onClick={() => setIsEdit(!isEdit)}
                className=""
              >
                <BiEdit fontSize={44} />
              </UnstyledButton>
            </div>
            {!isEdit && districtData?.whyInvest ? (
              <ContentPreview content={districtData.whyInvest} />
            ) : (
              <ContentFormComponent
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                isLoading={isLoading}
                submitHandler={submitHandler}
                value={value}
                setValue={setValue}
                setIsEdit={setIsEdit}
              />
            )}
          </Paper>
        )}
      </section>
    </section>
  )
}

export default WhyInvestSection
