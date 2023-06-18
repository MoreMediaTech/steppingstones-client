'use client'
import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Loader, Paper, UnstyledButton } from '@components/mantine-components'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

import { CountySectionForm } from 'app/components/forms'
import { setError } from 'app/global-state/features/upload/uploadSlice'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyNewsMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { useAppDispatch } from 'app/global-state/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from 'app/components/ContentPreview'
import Button from '@components/Button'
import Header from '@components/Header'

type Props = { id: string; county: string }

export default function News({ id, county }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateCountyNews, { isLoading }] =
    useUpdateOrCreateCountyNewsMutation()

  const [value, setValue] = useState<string>(
    countyData?.news?.content as string
  )
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

  const submitHandler: SubmitHandler<Partial<EditorFormDataProps>> =
    useCallback(
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
            color: 'red',
          })
        }
      },
      [value]
    )

  return (
    <>
      <section className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Header title="County News" order={1} />
          <Button
            type="button"
            color="outline"
            className="md:w-1/4"
            onClick={() => {
              router.push(
                `/admin-portal/county-portal/${county}?countyId=${id}`
              )
            }}
          >
            Go Back
          </Button>
        </div>
      </section>
      <section className="relative h-auto w-full flex-grow px-2 py-2  md:px-8 md:py-8">
        <section className="w-full rounded-md  p-4 shadow-lg ">
          {isLoadingCounty ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                {countyData?.news?.isLive ? (
                  <div className="rounded-xl bg-green-500 px-2 py-1 text-sm font-semibold text-white">
                    <p>Live</p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-red-500 px-2 py-1 text-sm font-semibold text-white">
                    <p>Not Live</p>
                  </div>
                )}
                <UnstyledButton
                  type="button"
                  onClick={() => setIsEdit(!isEdit)}
                  className=""
                >
                  <BiEdit
                    fontSize={44}
                    className="text-gray-900 dark:text-primary-light-100"
                  />
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
    </>
  )
}
