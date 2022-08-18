import {  useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import SectionContainer from '@components/CountyDistrictSections/SectionContainer'
import { EconomicDataSection } from '@components/CountyDistrictSections'
import { CreateSectionForm } from '@components/forms'

import { AdminLayout } from 'layout'
import { DistrictSectionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetDistrictSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateDistrictSectionByIdMutation,
} from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import Button from '@components/Button'
import { wrapper } from 'app/store'

const DistrictSection = ({ id, district }: { id: string; district: string; }) => {
  const router = useRouter()
  const { data: user } = useGetUserQuery()
  const {
    data: laSectionData,
    isLoading: isLoadingSection,
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetDistrictSectionByIdQuery(id, { refetchOnMountOrArgChange: true })

  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(laSectionData?.isLive as boolean)
  const [opened, setOpened] = useState(false)
  const [type, setType] = useState<'create' | 'edit'>('create')
  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateDistrictSectionById, { isLoading }] =
    useUpdateDistrictSectionByIdMutation()

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
              title={`${district ?? 'LA'} ${laSectionData?.name ?? 'Section'}`}
              subTitle="Review or edit the content below"
              data={laSectionData}
            />
            <section className="container mx-auto px-4 py-2">
              <div className="flex justify-between">
                <Button
                  type="button"
                  color="outline"
                  className=" md:w-1/4 "
                  onClick={() => {
                    router.push({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district`,
                      query: { ...router.query },
                    })
                  }}
                >
                  Go Back
                </Button>

                {laSectionData?.isEconomicData && (
                  <Button
                    type="button"
                    color="outline"
                    className="md:w-1/4 "
                    onClick={() => {
                      setOpened(true)
                      setType('create')
                    }}
                  >
                    Add Economic Data
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
                <div className="container mx-auto flex justify-end px-2 md:px-4">
                  {laSectionData?.isEconomicData && (
                    <>
                      {laSectionData.isLive ? (
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
                {laSectionData?.isEconomicData ? (
                  <section className="container mx-auto w-full overflow-auto py-24 px-2 md:px-4">
                    <EconomicDataSection
                      id={laSectionData?.id}
                      opened={opened}
                      setOpened={setOpened}
                      type={type}
                      setType={setType}
                      isLoadingSection={isLoadingSection}
                      refetch={refetchSection}
                      economicDataWidgets={laSectionData?.economicDataWidgets}
                    />
                  </section>
                ) : (
                  <SectionContainer
                    isLoadingSection={isLoadingSection}
                    sectionData={laSectionData as DistrictSectionProps}
                    refetch={refetchSection}
                    updateSectionById={updateDistrictSectionById}
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
            id={laSectionData?.id as string}
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
      const { district, districtId } = context.query
      if (!cookies) {
        context.res.writeHead(302, { Location: NEXT_URL })
        context.res.end()
      }

      return {
        props: {
          district,
          id: context?.params?.id,
        },
      }
    }
  )

export default DistrictSection
