import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'

import { CountySectionForm } from '@components/forms'
import { setError } from 'features/upload/uploadSlice'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateOnlineDigitilisationMutation,
} from 'features/editor/editorApiSlice'
import { useAppDispatch } from 'app/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from '@components/ContentPreview'
import Spinner from '@components/spinner'


const OnlineDigitalisationSECTION = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateOnlineDigitilisation, { isLoading }] = useUpdateOrCreateOnlineDigitilisationMutation()

  const [value, setValue] = useState<string>(
    countyData?.topicalBusinessIssues?.onlineDigitilisation?.content
  )
  const [isEdit, setIsEdit] = useState<boolean>(false)

  
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<EditorFormDataProps>>({
    defaultValues: {
      title: countyData?.topicalBusinessIssues?.onlineDigitilisation?.title,
    },
  })
  
  useEffect(() => {
    // reset the form when the county data is changed/updated
    reset({ title: countyData?.topicalBusinessIssues?.onlineDigitilisation?.title })
  }, [countyData])

  const submitHandler: SubmitHandler<Partial<EditorFormDataProps>> =
    useCallback(async (data) => {
      try {
        const formData = {
          title: data.title,
          content: value,
          countyId: id,
          id: countyData?.topicalBusinessIssues?.id,
        }
        await updateOrCreateOnlineDigitilisation(formData).unwrap()
        refetchCounty()
        setIsEdit(false)
      } catch (error) {
        dispatch(setError({ message: error.message }))
        showNotification({
          message: 'Error updating county content',
          autoClose: 3000,
          color: 'red',
        })
      }
    }, [value])

  return (
    <section className="relative h-auto w-full flex-grow px-2 py-2  md:py-8 md:px-8">
      <section className="container">
        {isLoadingCounty ? (
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
            {!isEdit && countyData?.topicalBusinessIssues?.onlineDigitilisation ? (
              <ContentPreview
                content={countyData?.topicalBusinessIssues?.onlineDigitilisation}
              />
            ) : (
              <CountySectionForm
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

export default OnlineDigitalisationSECTION
