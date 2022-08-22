import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Loader } from '@mantine/core'



import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import { AddDistrictForm, CreateSectionForm } from '@components/forms'
import Button from '@components/Button'

import { AdminLayout } from 'layout'
import { DistrictDataProps, SectionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetCountyByIdQuery,
  useCreateSectionMutation,
} from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import PortalButton from '@components/PortalButton'
const Map = dynamic(() => import('@components/Map'), { ssr: false })



const County = ({ county, countyId }: { county: string; countyId: string }) => {
  const router = useRouter()
  const [opened, setOpened] = useState<boolean>(false)
  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)

  const { data: user } = useGetUserQuery()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(countyId, { refetchOnMountOrArgChange: true })

  const [createSection, { isLoading: isLoadingCreateSection }] = useCreateSectionMutation()
  const districts = countyData?.districts.map((district) => district.name)

  return (
    <AdminLayout title={`${countyData?.name} - Editor Dashboard`}>
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <section className="h-screen overflow-auto">
          <PortalHeader
            title={`${countyData?.name} Portal` ?? 'County Portal'}
            subTitle="Please select district from the menu below"
            data={countyData}
          />
          <section className="px-2 sm:px-4 py-2">
            <div className="flex justify-between">
              <Button
                type="button"
                color="outline"
                className=" md:w-1/4 "
                onClick={() => {
                  router.replace({
                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal`,
                  })
                }}
              >
                Go Back
              </Button>
              <div className="flex items-center gap-2 md:w-1/3">
                <Button
                  type="button"
                  color="outline"
                  className="md:w-full"
                  onClick={() => setAddOpenSectionModal((o) => !o)}
                >
                  Add County Section
                </Button>
                <Button
                  type="button"
                  color="outline"
                  className="md:w-full "
                  onClick={() => setOpened((o) => !o)}
                >
                  Add LA
                </Button>
              </div>
            </div>
          </section>
          {isLoadingCounty ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <section className=" w-full overflow-auto py-24 min-h-[500px] px-2 md:px-4">
              {countyData && (
                <div className="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-4">
                  <div className='md:col-span-2 h-full bg-white p-2 shadow-md rounded'>
                    <Map location={`${county}, UK`} districtsArray={districts as string[]} />
                  </div>
                  <div className="h-full w-full md:col-span-2">
                    <div className="flex flex-col">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <PortalButton
                          type="button"
                          color="primaryFilled"
                          isLive={countyData.welcome?.isLive}
                          onClick={() => {
                            router.replace({
                              pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/welcome`,
                              query: { county, countyId },
                            })
                          }}
                        >
                          Welcome
                        </PortalButton>
                        <PortalButton
                          type="button"
                          color="primaryFilled"
                          isLive={countyData.lep?.isLive}
                          onClick={() => {
                            router.replace({
                              pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/lep`,
                              query: { county, countyId },
                            })
                          }}
                        >
                          LEP
                        </PortalButton>
                        <PortalButton
                          type="button"
                          color="primaryFilled"
                          isLive={countyData.news?.isLive}
                          onClick={() => {
                            router.replace({
                              pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/news`,
                              query: { county, countyId },
                            })
                          }}
                        >
                          NEWS
                        </PortalButton>
                      </div>
                      <div className="w-full space-y-4 py-8">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-10 ">
                          {countyData?.districts?.map(
                            (district: DistrictDataProps) => (
                              <PortalButton
                                key={district?.id}
                                type="button"
                                color='primaryFilled'
                                isLive={district?.isLive}
                                onClick={() =>
                                  router.replace({
                                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district`,
                                    query: {
                                      ...router.query,
                                      district: district?.name,
                                      districtId: district?.id,
                                    },
                                  })
                                }
                              >
                                {district?.name}
                              </PortalButton>
                            )
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-y-4 gap-x-4">
                          {countyData?.sections?.map(
                            (section: SectionProps) => (
                              <PortalButton
                                key={`${section?.id}`}
                                type="button"
                                color='primaryFilled'
                                isLive={section?.isLive}
                                onClick={() =>
                                  router.replace({
                                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/section`,
                                    query: {
                                      ...router.query,
                                      section: section.name,
                                      sectionId: section.id,
                                    },
                                  })
                                }
                              >
                                {section?.name}
                              </PortalButton>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}
        </section>
        <AddDistrictForm
          opened={opened}
          setOpened={setOpened}
          countyId={countyId}
          county={countyData?.name as string}
          refetch={refetchCounty}
        />
        <CreateSectionForm
          opened={openAddSectionModal}
          setOpened={setAddOpenSectionModal}
          isLoading={isLoadingCreateSection}
          createSection={createSection}
          refetch={refetchCounty}
          id={countyData?.id as string}
        />
      </ComponentShield>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token
  const { county, countyId } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {
      county: county,
      countyId: countyId,
    },
  }
}

export default County
