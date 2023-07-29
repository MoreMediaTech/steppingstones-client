'use client'
import { BiEdit } from 'react-icons/bi'

import { Loader, Paper, UnstyledButton } from '@components/mantine-components'
import { ContentForm } from 'app/components/forms'
import { SectionProps } from '@lib/types'
import ContentPreview from 'app/components/ContentPreview'
import { useContentForm } from '@hooks/useContentForm'
import { Badge } from '@components/ui/badge'

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

  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        data: {
          title: sectionData.title as string,
          isLive: sectionData.isLive as boolean,
          content: sectionData.content as string,
          author: sectionData.author as string ?? '',
          summary: sectionData.summary as string ?? '',
          imageFile: sectionData.imageUrl as string,
          id: sectionData.id as string,
        },
        updateOrCreate: updateSectionById,
      },
      refetch
    )
    console.log('🚀 ~ file: section-container.tsx:43 ~ preview,:', preview)

  return (
    <section className="relative w-full flex-grow py-8">
      {isLoadingSection ? (
        <div className="flex h-[700px] items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <div  className="w-full">
          <div className="mb-4 flex w-full items-center justify-between">
            {sectionData?.isLive ? (
              <Badge>Live</Badge>
            ) : (
              <Badge variant="destructive">Not Live</Badge>
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
            <ContentForm
              form={form}
              preview={preview}
              isLoading={isLoading}
              onChangePicture={onChangePicture}
              onSubmit={onSubmit}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
      )}
    </section>
  )
}

export default SectionContainer
