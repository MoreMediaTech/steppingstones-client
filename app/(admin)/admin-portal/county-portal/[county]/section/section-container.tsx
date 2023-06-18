'use client'
import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BiEdit } from 'react-icons/bi'

import {
  showNotification,
  Loader,
  Paper,
  UnstyledButton,
} from '@components/mantine-components'
import { CountySectionForm } from 'app/components/forms'
import { EditorFormDataProps, SectionProps } from '@lib/types'
import ContentPreview from 'app/components/ContentPreview'

type Props = {
  sectionData: SectionProps
  isLoadingSection: boolean
  isLoading: boolean
  refetch(): void
  updateSectionById: any
}

const SectionContainer = ({
  sectionData,
  isLoadingSection,
  refetch,
  updateSectionById,
  isLoading,
}: Props) => {
  const [value, setValue] = useState<string>(sectionData?.content as string)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<EditorFormDataProps>>({
    defaultValues: {
      title: sectionData?.title,
      isLive: sectionData?.isLive,
    },
  })

  useEffect(() => {
    // reset the form when the county data is changed/updated
    reset({ title: sectionData?.title, isLive: sectionData?.isLive })
    setValue(sectionData?.content as string)
  }, [sectionData])

  const submitHandler: SubmitHandler<Partial<EditorFormDataProps>> =
    useCallback(
      async (data) => {
        try {
          const formData = {
            title: data.title,
            isLive: data.isLive,
            content: value,
            id: sectionData?.id,
          }
          await updateSectionById(formData).unwrap()
          refetch()
          setIsEdit(false)
        } catch (error) {
          showNotification({
            message: 'Error updating section content',
            autoClose: 3000,
            color: 'red',
          })
        }
      },
      [value, sectionData]
    )
  return (
    <section className="relative w-full flex-grow py-8">
      <section>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <Paper shadow="sm" p="md" radius="md" withBorder className="w-full">
            <div className="mb-4 flex w-full items-center justify-between">
              {sectionData?.isLive ? (
                <div className="rounded-xl bg-green-500 px-2 py-1 text-sm text-white">
                  <p>Live</p>
                </div>
              ) : (
                <div className="rounded-xl bg-red-500 px-2 py-1 text-sm text-white">
                  <p>Not Live</p>
                </div>
              )}
              <UnstyledButton
                type="button"
                onClick={() => setIsEdit(!isEdit)}
                className=""
              >
                <BiEdit fontSize={34} />
              </UnstyledButton>
            </div>
            {!isEdit && sectionData ? (
              <ContentPreview content={sectionData} />
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

export default SectionContainer
