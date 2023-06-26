'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

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
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(sectionId)

  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)
  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateSectionById, { isLoading }] = useUpdateSectionByIdMutation()

  return (
    <>
      <section className="container mx-auto h-full max-w-screen-sm px-2 py-2 sm:px-8 sm:py-8">
        <div className="my-4 flex w-full flex-col  items-center justify-between sm:flex-row">
          <div className="flex items-center gap-2">
            <Header title={sectionData?.name as string} order={1} />
            <div className="flex justify-end">
              {sectionData?.isSubSection && (
                <>
                  {sectionData?.isLive ? (
                    <p className="rounded-xl bg-[#5E17EB] px-2 py-1 text-sm font-semibold text-white">
                      Live
                    </p>
                  ) : (
                    <p className="rounded-xl bg-red-500 px-2 py-1 text-sm font-semibold text-white">
                      Not Live
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 sm:w-1/3 sm:flex-row">
            <Button
              type="button"
              color="outline"
              className=" w-full "
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
                className="w-full"
                onClick={() => setAddOpenSectionModal((o) => !o)}
              >
                Add Section
              </Button>
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
                  <div className="container mx-auto grid max-w-screen-sm grid-cols-2 gap-4">
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
