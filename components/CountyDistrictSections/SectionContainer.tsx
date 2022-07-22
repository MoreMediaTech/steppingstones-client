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
    },
  })

  useEffect(() => {
    // reset the form when the county data is changed/updated
    reset({ title: sectionData?.title })
    setValue(sectionData?.content as string)
  }, [sectionData])

  const submitHandler: SubmitHandler<Partial<EditorFormDataProps>> =
    useCallback(
      async (data) => {
        try {
          const formData = {
            title: data.title,
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
    <section className="relative w-full flex-grow px-2 py-2  md:py-8 md:px-8">
      <section className="container mx-auto">
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
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
