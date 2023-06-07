'use client'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

import { ComponentShield } from 'app/components/NextShield'
import PortalHeader from 'app/components/PortalHeader'
import Button from 'app/components/Button'
import SectionContainer from '../../section-container'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import {
  useGetSubSubSectionByIdQuery,
  useUpdateSubSubSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { SubSubSectionProps } from '@lib/types'

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
  const { data: user } = useGetUserQuery()
  const {
    data: subSubSectionData,
    isLoading: isLoadingSubSubSection,
    isError: isErrorSubSection,
    refetch: refetchSubSection,
  } = useGetSubSubSectionByIdQuery(searchParams.subSubSectionId, {
    refetchOnMountOrArgChange: true,
  })

  const [updateSubSubSectionById, { isLoading }] =
    useUpdateSubSubSectionByIdMutation()

  return (
    <ComponentShield RBAC showForRole={'SS_EDITOR'} userRole={user?.role ?? ''}>
      <section className="h-screen overflow-auto">
        <PortalHeader
          title={`${subSubSectionData?.name ?? 'Section'}`}
          subTitle={'Review or edit the content below'}
          data={subSubSectionData}
        />
        <section className="container mx-auto px-4 py-2">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className=" md:w-1/4 "
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${searchParams.county}/section/subsection?county=${searchParams.county}&countyId=${searchParams.countyId}&sectionId=${searchParams.sectionId}&subSectionId=${searchParams.subSectionId}`
                )
              }}
            >
              Go Back
            </Button>
          </div>
        </section>
        {isLoadingSubSubSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto px-2 py-2 md:px-4">
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
    </ComponentShield>
  )
}
