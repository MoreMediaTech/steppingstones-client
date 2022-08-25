import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Loader, Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'

import { CountySectionForm } from '@components/forms'
import { EditorFormDataProps, SectionProps } from '@lib/types'
import ContentPreview from '@components/ContentPreview'

const SectionContainer = ({
  sectionData,
  isLoadingSection,
  refetch,
  updateSectionById,
  isLoading
}: {
  sectionData: SectionProps
  isLoadingSection: boolean
  isLoading: boolean
  refetch(): void
  updateSectionById: any
}) => {
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
    <section className="relative w-full flex-grow px-2 py-2  md:py-8 md:px-4">
      <section>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <Paper shadow="sm" p="md" radius="md" withBorder className="w-full">
            <div className="flex w-full items-center justify-between mb-4">
              {sectionData?.isLive ? (
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
                <BiEdit fontSize={44} />
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
