import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'

import { ContentFormComponent } from '@components/forms'
import { setError, setPreviewSource } from 'features/upload/uploadSlice'
import {
  useUpdateOrCreateDistrictCouncilServicesMutation,
  useGetDistrictByIdQuery,
} from 'features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from '@components/ContentPreview'
import Spinner from '@components/spinner'

const CouncilServicesSection = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
    refetch: refetchDistrict,
  } = useGetDistrictByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateDistrictCouncilServices, { isLoading }] =
    useUpdateOrCreateDistrictCouncilServicesMutation()

  const [value, setValue] = useState<string>(
    districtData?.councilServices?.content
  )
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditorFormDataProps>({
    defaultValues: {
      title: districtData?.councilServices?.title,
    },
  })

  useEffect(() => {
    // reset the form when the county data is changed/updated
    reset({ title: districtData?.councilServices?.title })
  }, [districtData])

  const convertFileToBase64 = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.onerror = () => {
      showNotification({
        message: 'Error converting image',
        autoClose: 3000,
        color: 'red',
      })
      dispatch(setError({ message: 'something went wrong!' }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      convertFileToBase64(file)
    }
  }

  const submitHandler: SubmitHandler<EditorFormDataProps> = useCallback(
    async (data) => {
      try {
        const formData = {
          title: data.title,
          imageFile: preview,
          content: value,
          districtId: id,
          id: districtData?.councilServices?.id,
        }
        await updateOrCreateDistrictCouncilServices(formData).unwrap()
        refetchDistrict()
        setIsEdit(false)
        setPreview(null)
      } catch (error) {
        dispatch(setError({ message: error.message }))
        showNotification({
          message: 'Error updating district content',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    [value, preview]
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
            {!isEdit && districtData?.councilServices ? (
              <ContentPreview content={districtData?.councilServices} />
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
                preview={preview}
                setPreview={setPreview}
                handleChange={handleChange}
              />
            )}
          </Paper>
        )}
      </section>
    </section>
  )
}

export default CouncilServicesSection
