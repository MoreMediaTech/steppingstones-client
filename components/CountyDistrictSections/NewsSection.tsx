import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Loader, Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'

import { CountySectionForm } from '@components/forms'
import { setError } from 'features/upload/uploadSlice'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyNewsMutation,
} from 'features/editor/editorApiSlice'
import { useAppDispatch } from 'app/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from '@components/ContentPreview'
import Spinner from '@components/spinner'

const NewsSection = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateCountyNews, { isLoading }] = useUpdateOrCreateCountyNewsMutation()

  const [value, setValue] = useState<string>(countyData?.news?.content as string)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<EditorFormDataProps>>({
    defaultValues: {
      title: countyData?.news?.title,
      isLive: countyData?.news?.isLive,
    },
  })
  
  useEffect(() => {
    // reset the form when the county data is changed/updated
    reset({ title: countyData?.news?.title })
    setValue(countyData?.news?.content as string)
  }, [countyData])

  const submitHandler: SubmitHandler<Partial<EditorFormDataProps>> = useCallback(
    async (data) => {

      try {
        const formData = {
          title: data.title,
          content: value,
          countyId: id,
          isLive: data.isLive,
          id: countyData?.news?.id,
        }
        await updateOrCreateCountyNews(formData).unwrap()
        refetchCounty()
        setIsEdit(false)
      } catch (error) {
        dispatch(setError({ message: error.message }))
        showNotification({
          message: 'Error updating county content',
          autoClose: 3000,
          color: 'red'
        })
      }
    },
    [value]
  )


  return (
    <section className="relative h-auto w-full flex-grow px-2 py-2  md:py-8 md:px-8">
      <section className="w-full rounded-md bg-primary-light-50 p-4 shadow-lg dark:bg-primary-dark-500">
        {isLoadingCounty ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              {countyData?.news?.isLive ? (
                <div className="rounded-xl bg-primary-dark-100 px-2 py-1 text-xl font-semibold text-white">
                  <h1>Live</h1>
                </div>
              ) : (
                <div className="rounded-xl bg-red-500 px-2 py-1 text-xl font-semibold text-white">
                  <h1>Not Live</h1>
                </div>
              )}
              <UnstyledButton
                type="button"
                onClick={() => setIsEdit(!isEdit)}
                className=""
              >
                <BiEdit fontSize={44} className="text-gray-900 dark:text-primary-light-100"/>
              </UnstyledButton>
            </div>
            {!isEdit && countyData?.news ? (
              <ContentPreview content={countyData?.news} />
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
          </div>
        )}
      </section>
    </section>
  )
}

export default NewsSection
