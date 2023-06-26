'use client'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

import Button from 'app/components/Button'
import SectionContainer from '../../section-container'
import {
  useGetSubSubSectionByIdQuery,
  useUpdateSubSubSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { SubSubSectionProps } from '@lib/types'
import Header from '@components/Header'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
    subSectionId: string
    subSubSectionId: string
  }
}

export default function SubSubSection({ searchParams }: Props) {
  const router = useRouter()
  const {
    data: subSubSectionData,
    isLoading: isLoadingSubSubSection,
    refetch: refetchSubSection,
  } = useGetSubSubSectionByIdQuery(searchParams.subSubSectionId, {
    refetchOnMountOrArgChange: true,
  })

  const [updateSubSubSectionById, { isLoading }] =
    useUpdateSubSubSectionByIdMutation()

  return (
    <>
      <section className="container mx-auto max-w-screen-sm px-2 py-2 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Header title={subSubSectionData?.title as string} order={1} />
          <Button
            type="button"
            color="outline"
            className=" sm:w-1/4 "
            onClick={() => {
              router.push(
                `/admin-portal/county-portal/${searchParams.county}/section/subsection?county=${searchParams.county}&countyId=${searchParams.countyId}&sectionId=${searchParams.sectionId}&subSectionId=${searchParams.subSectionId}`
              )
            }}
          >
            Go Back
          </Button>
        </div>
        {isLoadingSubSubSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto">
            <SectionContainer
              isLoadingSection={isLoadingSubSubSection}
              sectionData={subSubSectionData as SubSubSectionProps}
              refetch={refetchSubSection}
              isLoading={isLoading}
              updateSectionById={updateSubSubSectionById}
            />
          </section>
        )}
      </section>
    </>
  )
}
