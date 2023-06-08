'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

import PortalHeader from 'app/components/PortalHeader'
import { SectionProps, SubSectionProps } from '@lib/types'
import {
  useGetSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { CreateSectionForm } from 'app/components/forms'
import Button from 'app/components/Button'
import SectionContainer from 'app/(admin)/admin-portal/county-portal/[county]/section/section-container'
import PortalButton from 'app/components/PortalButton'

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
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(sectionId)

  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)
  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateSectionById, { isLoading }] = useUpdateSectionByIdMutation()

  return (
    <>
      <section className="h-screen overflow-auto">
        <PortalHeader
          title={`${sectionData?.name ?? 'Section'}`}
          subTitle={
            sectionData?.isSubSection
              ? 'Please select from the menu below'
              : 'Review or edit the content below'
          }
          data={sectionData}
        />
        <section className="container mx-auto max-w-screen-md px-2 py-2 sm:px-0">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className=" md:w-1/4 "
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${county}?countyId=${countyId}&county=${county}`
                )
              }}
            >
              Go Back
            </Button>

            {sectionData?.isSubSection && (
              <Button
                type="button"
                color="outline"
                className="md:w-1/4"
                onClick={() => setAddOpenSectionModal((o) => !o)}
              >
                Add Section
              </Button>
            )}
          </div>
          {isLoadingSection ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <section className="w-full overflow-auto ">
              <div className="flex justify-end px-2 md:px-4">
                {sectionData?.isSubSection && (
                  <>
                    {sectionData?.isLive ? (
                      <h1 className="rounded-xl bg-[#5E17EB] px-2 py-1 text-xl font-semibold text-white">
                        Live
                      </h1>
                    ) : (
                      <h1 className="rounded-xl bg-red-500 px-2 py-1 text-xl font-semibold text-white">
                        Not Live
                      </h1>
                    )}
                  </>
                )}
              </div>
              {sectionData?.isSubSection ? (
                <section className="min-h-[500px] w-full overflow-auto md:py-24">
                  {sectionData && (
                    <div className="container mx-auto grid max-w-screen-lg grid-cols-2 gap-4">
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
      </section>
      <CreateSectionForm
        opened={openAddSectionModal}
        setOpened={setAddOpenSectionModal}
        isLoading={isLoadingCreate}
        createSection={createSubSection}
        refetch={refetchSection}
        id={sectionData?.id as string}
      />
    </>
  )
}
