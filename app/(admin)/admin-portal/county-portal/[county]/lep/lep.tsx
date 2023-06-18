'use client'
import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Loader, UnstyledButton } from '@components/mantine-components'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

import { CountySectionForm } from 'app/components/forms'
import { setError } from 'app/global-state/features/upload/uploadSlice'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyLEPMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { useAppDispatch } from 'app/global-state/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from 'app/components/ContentPreview'
import Button from '@components/Button'
import Header from '@components/Header'

type Props = {
  id: string
  county: string
}

export default function LEP({ id, county }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateCountyLEP, { isLoading }] =
    useUpdateOrCreateCountyLEPMutation()

  const [value, setValue] = useState<string>(countyData?.lep?.content as string)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<EditorFormDataProps>>({
    defaultValues: {
      title: countyData?.lep?.title,
      isLive: countyData?.lep?.isLive,
    },
  })

  useEffect(() => {
    // reset the form when the county data is changed/updated
    reset({ title: countyData?.lep?.title })
    setValue(countyData?.lep?.content as string)
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
            id: countyData?.lep?.id,
          }
          await updateOrCreateCountyLEP(formData).unwrap()
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
      <section className="container mx-auto px-2 py-2 md:px-8 md:py-8">
        <div className="flex items-center justify-between">
          <Header title="LEP" order={1} />
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
        <section className="w-full rounded-md bg-gray-100 p-4 shadow-lg dark:bg-[#3b3c40]">
          {isLoadingCounty ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                {countyData?.lep?.isLive ? (
                  <div className="rounded-xl bg-green-500 px-2 py-1 text-xl font-semibold text-white">
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
                  <BiEdit
                    fontSize={44}
                    className="text-gray-900 dark:text-primary-light-100"
                  />
                </UnstyledButton>
              </div>
              {!isEdit && countyData?.lep ? (
                <ContentPreview content={countyData?.lep} />
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

