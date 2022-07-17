import {  useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import { AdminLayout } from 'layout'
import { SubSectionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateSectionByIdMutation,
} from 'features/editor/editorApiSlice'
import { CreateSectionForm } from '@components/forms'
import { NEXT_URL } from '@config/index'
import Button from '@components/Button'
import { wrapper } from 'app/store'
import SectionContainer from '@components/CountyDistrictSections/SectionContainer'

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
  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)

  const { data: user } = useGetUserQuery()
  const {
    data: sectionData,
    isLoading: isLoadingSection,
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetSectionByIdQuery(sectionId, { refetchOnMountOrArgChange: true })

  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateSectionById, { isLoading }] = useUpdateSectionByIdMutation()

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
              title={`${sectionData?.name ?? 'Section'}`}
              subTitle={
                sectionData?.isSubSection
                  ? 'Please select from the menu below'
                  : 'Review or edit the content below'
              }
              data={sectionData}
            />
            <section className="container mx-auto px-4 py-2">
              <div className="flex justify-between">
                <Button
                  type="button"
                  color="primary"
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
                    color="primary"
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
                {sectionData?.isSubSection ? (
                  <section className="container mx-auto w-full overflow-auto py-24 px-2 md:px-4">
                    {sectionData && (
                      <div className="flex h-full w-full flex-col gap-8 md:flex-row">
                        <div className="cols-span-1 h-full w-full  md:w-2/5">
                          {imageUrl !== null && (
                            <div className="flex flex-col space-y-2">
                              {/* <Image
                              src={imageUrl}
                              alt={sectionData?.name}
                              width={500}
                              height={720}
                            /> */}
                            </div>
                          )}
                        </div>
                        <div className="h-full w-full md:w-3/4">
                          <div className="flex flex-col">
                            <div className="w-full space-y-4 py-8">
                              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                                {sectionData?.subsections?.map(
                                  (section: SubSectionProps) => (
                                    <button
                                      key={`${section.id}`}
                                      type="button"
                                      className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-4 px-2 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-xl"
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
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                ) : (
                  <SectionContainer
                    isLoadingSection={isLoadingSection}
                    sectionData={sectionData}
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
            id={sectionData?.id}
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
      const { sectionId, county, countyId } = context.query
      if (!cookies) {
        context.res.writeHead(302, { Location: NEXT_URL })
        context.res.end()
      }

      const imageUrl = store.getState().editor.county.imageUrl
      return {
        props: {
          county,
          sectionId,
          countyId,
          imageUrl,
        },
      }
    }
  )

export default Section
