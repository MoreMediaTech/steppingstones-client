'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@mantine/core'

import { ComponentShield } from 'app/components/NextShield'
import PortalHeader from 'app/components/PortalHeader'
import { SectionProps, SubSectionProps } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import {
  useGetSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { CreateSectionForm } from 'app/components/forms'
import Button from 'app/components/Button'
import SectionContainer from 'app/components/CountyDistrictSections/SectionContainer'
import PortalButton from 'app/components/PortalButton'

export default function Section({
  searchParams,
}: {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
  }
}) {
  const router = useRouter()
  const { data: user } = useGetUserQuery()
  const {
    data: sectionData,
    isLoading: isLoadingSection,
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(searchParams.sectionId)

  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)
  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateSectionById, { isLoading }] = useUpdateSectionByIdMutation()

  return (
    <ComponentShield RBAC showForRole={'SS_EDITOR'} userRole={user?.role ?? ''}>
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
        <section className="px-2 py-2 sm:px-4">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className=" md:w-1/4 "
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${searchParams.county}?countyId=${searchParams.countyId}&county=${searchParams.county}`
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
        </section>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto px-2 py-2 md:px-4">
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
              <section className="min-h-[500px] w-full overflow-auto px-2 py-2  md:px-4 md:py-24">
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
                              `/admin-portal/county-portal/${searchParams.county}/section/subsection?countyId=${searchParams.countyId}&county=${searchParams.county}&sectionId=${searchParams.sectionId}&subSectionId=${section.id}`
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
    </ComponentShield>
  )
}
