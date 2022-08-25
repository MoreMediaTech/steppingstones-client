import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import Button from '@components/Button'
import { SectionContainer } from '@components/CountyDistrictSections'

import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetSubSubSectionByIdQuery,
  useUpdateSubSubSectionByIdMutation,
} from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import { wrapper } from 'app/store'
import { SubSubSectionProps } from '@lib/types'


const SubSubSection = ({
  county,
  subSubSection,
  subSubSectionId,
}: {
  county: string
  section: string
  subSubSection: string
  subSubSectionId: string
  imageUrl: string
}) => {
  const router = useRouter()

  const { data: user } = useGetUserQuery()
  const {
    data: subSubSectionData,
    isLoading: isLoadingSubSubSection,
    isError: isErrorSubSection,
    refetch: refetchSubSection,
  } = useGetSubSubSectionByIdQuery(subSubSectionId, {
    refetchOnMountOrArgChange: true,
  })

  const [updateSubSubSectionById, { isLoading }] =
    useUpdateSubSubSectionByIdMutation()

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
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/section/subsection`,
                      query: { ...router.query },
                    })
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
              <section className="w-full overflow-auto py-2 px-2 md:px-4">
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
      </AdminLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context

  const cookies = req.cookies.ss_refresh_token
  const { county, subSubSection, subSubSectionId } = context.query
  if (!cookies) {
    context.res.writeHead(302, { Location: NEXT_URL })
    context.res.end()
  }

  return {
    props: {
      county,
      subSubSection,
      subSubSectionId,
    },
  }
}


export default SubSubSection
