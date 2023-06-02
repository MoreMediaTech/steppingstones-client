'use client'
import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Loader, Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'

import { CountySectionForm } from 'app/components/forms'
import { setError } from 'app/global-state/features/upload/uploadSlice'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyLEPMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { useAppDispatch } from 'app/global-state/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from 'app/components/ContentPreview'
import Spinner from 'app/components/spinner'

const LEPSection = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
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
    <section className="relative h-auto w-full flex-grow px-2 py-2  md:px-8 md:py-8">
      <section className="w-full rounded-md bg-primary-light-50 p-4 shadow-lg dark:bg-primary-dark-500">
        {isLoadingCounty ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              {countyData?.lep?.isLive ? (
                <div className="rounded-xl bg-[#5E17EB] px-2 py-1 text-xl font-semibold text-white">
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
  )
}

export default LEPSection
