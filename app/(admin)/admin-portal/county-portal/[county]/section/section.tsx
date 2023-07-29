'use client'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

import { SectionProps, SubSectionProps } from '@lib/types'
import {
  useGetSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateSectionByIdMutation,
} from '@global-state/features/editor/editorApiSlice'
import CreateSectionForm from '../CreateSectionForm'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import SectionContainer from './section-container'
import PortalButton from '@components/PortalButton'
import Header from '@components/Header'

type Props = {
  county: string
  countyId: string
  sectionId: string
}

export default function Section({ county, countyId, sectionId }: Props) {
  const router = useRouter()

  const {
    data: sectionData,
    isLoading: isLoadingSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(sectionId)

  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateSectionById, { isLoading }] = useUpdateSectionByIdMutation()

  return (
    <>
      <section className="space-y-2">
        <div className="my-4 flex w-full flex-col-reverse  items-center justify-between sm:flex-row">
          <div className="flex items-center justify-start gap-2">
            <Header title={sectionData?.name as string} order={1} />
            {sectionData?.isSubSection && (
              <>
                {sectionData?.isLive ? (
                  <Badge>Live</Badge>
                ) : (
                  <Badge variant="destructive">Not Live</Badge>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-between sm:justify-end w-full gap-2 sm:w-1/3 flex-row">
            <Button
              type="button"
              className="w-1/3 sm:w-full border-gray-900 dark:border-gray-200"
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${county}?countyId=${countyId}&county=${county}`
                )
              }}
            >
              Go Back
            </Button>

            {sectionData?.isSubSection && (
              <CreateSectionForm
                createSection={createSubSection}
                refetch={refetchSection}
                id={sectionData?.id as string}
              />
            )}
          </div>
        </div>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto ">
            {sectionData?.isSubSection ? (
              <section className=" w-full overflow-auto md:py-24">
                {sectionData && (
                  <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sectionData?.subsections?.map(
                      (section: SubSectionProps) => (
                        <PortalButton
                          key={`${section.id}`}
                          type="button"
                          color="primaryFilled"
                          isLive={section?.isLive}
                          onClick={() =>
                            router.push(
                              `/admin-portal/county-portal/${county}/section/subsection?countyId=${countyId}&county=${county}&sectionId=${sectionId}&subSectionId=${section.id}`
                            )
                          }
                        >
                          {section?.name}
                        </PortalButton>
                      )
                    )}
                  </div>
                )}
              </section>
            ) : (
              <SectionContainer
                isLoadingSection={isLoadingSection}
                sectionData={sectionData as SectionProps}
                refetch={refetchSection}
                updateSectionById={updateSectionById}
                isLoading={isLoading}
              />
            )}
          </section>
        )}
      </section>
    </>
  )
}
