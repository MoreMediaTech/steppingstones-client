'use client'
import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  showNotification,
  Loader,
  UnstyledButton,
} from '@components/mantine-components'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

import { CountySectionForm } from 'app/components/forms'
import { setError } from 'app/global-state/features/upload/uploadSlice'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyWelcomeMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { useAppDispatch } from 'app/global-state/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from 'app/components/ContentPreview'
import Header from '@components/Header'
import Button from '@components/Button'

type Props = { id: string; county: string }

export default function Welcome({ id, county }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateCountyWelcome, { isLoading }] =
    useUpdateOrCreateCountyWelcomeMutation()

  const [value, setValue] = useState<string>(
    countyData?.welcome?.content as string
  )
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<EditorFormDataProps>>({
    defaultValues: {
      title: countyData?.welcome?.title,
      isLive: countyData?.welcome?.isLive,
    },
  })

  useEffect(() => {
    // reset the form when the county data is changed/updated
    reset({ title: countyData?.welcome?.title })
    setValue(countyData?.welcome?.content as string)
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
            id: countyData?.welcome?.id,
          }

          await updateOrCreateCountyWelcome(formData).unwrap()
          refetchCounty()
          setIsEdit(false)
        } catch (error) {
          dispatch(setError({ message: error.message }))
          showNotification({
            message: 'Something went wrong. Unable to update content',
            autoClose: 3000,
            color: 'red',
          })
        }
      },
      [value]
    )

  return (
    <section className="relative w-full ">
      <section className="mx-auto space-y-2 px-2 py-4 md:container md:max-w-screen-md md:px-0">
        <section className="flex items-center justify-between py-2">
          <Header title="Welcome" order={1} />
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
        </section>
        <section className=" w-full rounded-md bg-gray-100 p-4 shadow-lg dark:bg-[#3b3c40]">
          {isLoadingCounty ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <div className="w-full ">
              <div className="flex w-full items-center justify-between">
                {countyData?.welcome?.isLive ? (
                  <div className="rounded-xl bg-green-400 px-2 py-1 text-xs font-semibold text-white">
                    <h1>Live</h1>
                  </div>
                ) : (
                  <div className="rounded-xl bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                    <h1>Not Live</h1>
                  </div>
                )}
                <UnstyledButton
                  type="button"
                  onClick={() => setIsEdit(!isEdit)}
                  className=""
                >
                  <BiEdit
                    fontSize={34}
                    className="text-gray-900 dark:text-gray-100"
                  />
                </UnstyledButton>
              </div>
              {!isEdit && countyData?.welcome ? (
                <ContentPreview content={countyData?.welcome} />
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
    </section>
  )
}
