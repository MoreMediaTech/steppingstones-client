import {  useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Loader } from '@mantine/core'
import dynamic from 'next/dynamic'

import SectionContainer from '@components/CountyDistrictSections/SectionContainer'
import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import { CreateSectionForm } from '@components/forms'
import Button from '@components/Button'


import { AdminLayout } from 'layout'
import { SubSectionProps, SubSubSectionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetSubSectionByIdQuery,
  useCreateSubSubSectionMutation,
  useUpdateSubSectionByIdMutation,
} from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import { wrapper } from 'app/store'
import PortalButton from '@components/PortalButton'
const Map = dynamic(() => import('@components/Map'), { ssr: false })

const SubSection = ({
  county,
  subSectionId,
}: {
  county: string
  section: string
  subSection: string
  subSectionId: string
}) => {
  const router = useRouter()
  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)

  const { data: user } = useGetUserQuery()
  const {
    data: subSectionData,
    isLoading: isLoadingSubSection,
    isError: isErrorSubSection,
    refetch: refetchSubSection,
  } = useGetSubSectionByIdQuery(subSectionId, {
    refetchOnMountOrArgChange: true,
  })

  const [createSubSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSubSectionMutation()

  const [updateSubSectionById, { isLoading }] =
    useUpdateSubSectionByIdMutation()

  return (
    <>
      <AdminLayout>
        <ComponentShield
          RBAC
          showForRole={'SS_EDITOR'}
          userRole={user?.role ?? ''}
        >
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
            <section className="container mx-auto px-4 py-2">
              <div className="flex justify-between">
                <Button
                  type="button"
                  color="outline"
                  className=" md:w-1/4 "
                  onClick={() => {
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/section`,
                      query: { ...router.query },
                    })
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
              <section className="w-full overflow-auto py-2 px-2 md:px-4">
                {subSectionData?.isSubSubSection ? (
                  <section className="container mx-auto w-full overflow-auto min-h-[500px]  py-24 px-2 md:px-4">
                    {subSectionData && (
                      <div className="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="h-full rounded bg-white p-2 shadow-md md:col-span-2">
                          <Map location={`${county}, UK`} />
                        </div>
                        <div className="h-full w-full md:col-span-2">
                              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                                {subSectionData?.subSubSections?.map(
                                  (subSection: SubSubSectionProps) => (
                                    <PortalButton
                                      key={`${subSection.id}`}
                                      type="button"
                                      color='primaryFilled'
                                      onClick={() =>
                                        router.replace({
                                          pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/section/subsection/subsubsection`,
                                          query: {
                                            ...router.query,
                                            subSubSection: subSection?.name,
                                            subSubSectionId: subSection?.id,
                                          },
                                        })
                                      }
                                    >
                                      {subSection?.name}
                                    </PortalButton>
                                  )
                                )}
                              </div>
                        </div>
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
      </AdminLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      const { req } = context

      const cookies = req.cookies.ss_refresh_token
      const { county, section, sectionId, subSection, subSectionId } =
        context.query
      if (!cookies) {
        context.res.writeHead(302, { Location: NEXT_URL })
        context.res.end()
      }

      
      return {
        props: {
          county,
          subSection,
          section,
          sectionId,
          subSectionId,
        },
      }
    }
  )

export default SubSection
