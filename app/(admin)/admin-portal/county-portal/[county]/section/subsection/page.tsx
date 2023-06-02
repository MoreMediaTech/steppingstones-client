'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@mantine/core'

import SectionContainer from '@components/CountyDistrictSections/SectionContainer'
import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import { CreateSectionForm } from '@components/forms'
import Button from '@components/Button'

import { SubSectionProps, SubSubSectionProps } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import {
  useGetSubSectionByIdQuery,
  useCreateSubSubSectionMutation,
  useUpdateSubSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import PortalButton from '@components/PortalButton'

export default function SubSection({
  searchParams,
}: {
  searchParams: {
    county: string
    countyId: string
    sectionId: string
    subSectionId: string
  }
}) {
  const router = useRouter()
  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)

  const { data: user } = useGetUserQuery()
  const {
    data: subSectionData,
    isLoading: isLoadingSubSection,
    isError: isErrorSubSection,
    refetch: refetchSubSection,
  } = useGetSubSectionByIdQuery(searchParams.subSectionId, {
    refetchOnMountOrArgChange: true,
  })

  const [createSubSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSubSectionMutation()

  const [updateSubSectionById, { isLoading }] =
    useUpdateSubSectionByIdMutation()

  return (
    <ComponentShield RBAC showForRole={'SS_EDITOR'} userRole={user?.role ?? ''}>
      <section className="h-screen overflow-auto">
        <PortalHeader
          title={`${subSectionData?.name ?? 'Section'}`}
          subTitle={
            subSectionData?.isSubSubSection
              ? 'Please select from the menu below'
              : 'Review or edit the content below'
          }
          data={subSectionData}
        />
        <section className="px-2 py-2 sm:px-4">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className=" md:w-1/4 "
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${searchParams.county}/section?countyId=${searchParams.countyId}&sectionId=${searchParams.sectionId}`
                )
              }}
            >
              Go Back
            </Button>

            {subSectionData?.isSubSubSection && (
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
        {isLoadingSubSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto px-2 py-2 md:px-4">
            {subSectionData?.isSubSubSection ? (
              <section className="min-h-[500px] w-full overflow-auto  px-2 py-24 md:px-4">
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
      <CreateSectionForm
        opened={openAddSectionModal}
        setOpened={setAddOpenSectionModal}
        isLoading={isLoadingCreate}
        createSection={createSubSubSection}
        refetch={refetchSubSection}
        id={subSectionData?.id as string}
      />
    </ComponentShield>
  )
}