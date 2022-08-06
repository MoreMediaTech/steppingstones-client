import {  useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'

import { AdminLayout } from 'layout'
import { SubSectionProps, SubSubSectionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetSubSectionByIdQuery,
  useCreateSubSubSectionMutation,
  useUpdateSubSectionByIdMutation,
} from 'features/editor/editorApiSlice'
import { CreateSectionForm } from '@components/forms'
import { NEXT_URL } from '@config/index'
import Button from '@components/Button'
import { wrapper } from 'app/store'
import SectionContainer from '@components/CountyDistrictSections/SectionContainer'

const SubSection = ({
  county,
  subSection,
  subSectionId,
  imageUrl,
}: {
  county: string
  section: string
  subSection: string
  subSectionId: string
  imageUrl: string
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
                  color="primary"
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
                    color="primary"
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
                  <section className="container mx-auto w-full overflow-auto py-24 px-2 md:px-4">
                    {subSectionData && (
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
                                {subSectionData?.subSubSections?.map(
                                  (subSection: SubSubSectionProps) => (
                                    <button
                                      key={`${subSection.id}`}
                                      type="button"
                                      className={`${
                                        (!!subSection?.isLive as boolean)
                                          ? 'bg-[#5E17EB] hover:bg-[#3A0B99]'
                                          : 'bg-red-500 hover:bg-red-700'
                                      } flex w-full  cursor-pointer items-center justify-center rounded-xl py-2 px-2 text-lg font-semibold text-white shadow-lg 
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100  md:py-6 `}
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

      const imageUrl = store.getState().editor.county.imageUrl
      return {
        props: {
          county,
          subSection,
          section,
          sectionId,
          subSectionId,
          imageUrl,
        },
      }
    }
  )

export default SubSection
