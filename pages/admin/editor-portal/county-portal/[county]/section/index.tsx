import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'
import dynamic from 'next/dynamic'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import { AdminLayout } from 'layout'
import { SectionProps, SubSectionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateSectionByIdMutation,
} from 'features/editor/editorApiSlice'
import { CreateSectionForm } from '@components/forms'
import { NEXT_URL } from '@config/index'
import Button from '@components/Button'
import SectionContainer from '@components/CountyDistrictSections/SectionContainer'
import PortalButton from '@components/PortalButton'
import useHasMounted from '@hooks/useHasMounted'


const Section = ({
  county,
  section,
  sectionId,
  imageUrl,
}: {
  county: string
  section: string
  sectionId: string
  imageUrl: string
}) => {
  const router = useRouter()
  const hasMounted = useHasMounted()
  const { data: user } = useGetUserQuery()
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

  return hasMounted && (
    <>
      <AdminLayout>
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role ?? ''}
        >
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
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}`,
                      query: { ...router.query },
                    })
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
              <section className="w-full overflow-auto py-2 px-2 md:px-4">
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
                  <section className="min-h-[500px] w-full overflow-auto py-2 px-2  md:py-24 md:px-4">
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
                                router.replace({
                                  pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/section/subsection`,
                                  query: {
                                    ...router.query,
                                    subSection: section.name,
                                    subSectionId: section.id,
                                  },
                                })
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
      </AdminLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token
  const { sectionId, county, countyId } = context.query
  if (!cookies) {
    context.res.writeHead(302, { Location: NEXT_URL })
    context.res.end()
  }

  return {
    props: {
      county,
      sectionId,
      countyId,
    },
  }
}
  

export default Section
