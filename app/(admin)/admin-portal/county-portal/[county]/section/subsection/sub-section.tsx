'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

import SectionContainer from '../section-container'
import CreateSectionForm  from '../../CreateSectionForm'
import Button from 'app/components/Button'
import { SubSectionProps, SubSubSectionProps } from '@lib/types'
import {
  useGetSubSectionByIdQuery,
  useCreateSubSubSectionMutation,
  useUpdateSubSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import PortalButton from 'app/components/PortalButton'
import Header from '@components/Header'

type Props = {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
    subSectionId: string
  }
}

export default function SubSection({ searchParams }: Props) {
  const router = useRouter()
  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)

  const {
    data: subSectionData,
    isLoading: isLoadingSubSection,
    refetch: refetchSubSection,
  } = useGetSubSectionByIdQuery(searchParams.subSectionId, {
    refetchOnMountOrArgChange: true,
  })

  const [createSubSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSubSectionMutation()

  const [updateSubSectionById, { isLoading }] =
    useUpdateSubSectionByIdMutation()

  return (
    <>
      <section className="container mx-auto h-full max-w-screen-sm px-2 py-2 sm:px-4 sm:py-8">
        <div className="flex flex-col items-center  justify-between sm:flex-row">
          <Header title={subSectionData?.title as string} order={1} />
          <div className="flex items-center gap-2 sm:w-1/3">
            <Button
              type="button"
              color="outline"
              className=" w-full "
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${searchParams.county}/section?countyId=${searchParams.countyId}&sectionId=${searchParams.sectionId}`
                )
              }}
            >
              Go Back
            </Button>

            {subSectionData?.isSubSubSection && (
              <CreateSectionForm
                createSection={createSubSubSection}
                refetch={refetchSubSection}
                id={subSectionData?.id as string}
              />
            )}
          </div>
        </div>
        {isLoadingSubSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto">
            {subSectionData?.isSubSubSection ? (
              <section className="min-h-[500px] w-full overflow-auto py-24">
                {subSectionData && (
                  <div className="container mx-auto grid max-w-screen-lg grid-cols-2 gap-4">
                    {subSectionData?.subSubSections?.map(
                      (subSubSection: SubSubSectionProps) => (
                        <PortalButton
                          key={`${subSubSection.id}`}
                          type="button"
                          color="primaryFilled"
                          onClick={() =>
                            router.replace(
                              `/admin-portal/county-portal/${searchParams.county}/section/subsection/subsubsection?county=${searchParams.county}&countyId=${searchParams.countyId}&sectionId=${searchParams.sectionId}&subSectionId=${searchParams.subSectionId}&subSubSectionId=${subSubSection?.id}`
                            )
                          }
                        >
                          {subSubSection?.name}
                        </PortalButton>
                      )
                    )}
                  </div>
                )}
              </section>
            ) : (
              <SectionContainer
                isLoadingSection={isLoadingSubSection}
                sectionData={subSectionData as SubSectionProps}
                refetch={refetchSubSection}
                isLoading={isLoading}
                updateSectionById={updateSubSectionById}
              />
            )}
          </section>
        )}
      </section>
    </>
  )
}
