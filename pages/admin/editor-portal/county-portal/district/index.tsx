import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'
import dynamic from 'next/dynamic'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import Button from '@components/Button'
import { CreateLASectionForm } from '@components/forms'
import { AdminLayout } from 'layout'
import { DistrictSectionProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetDistrictByIdQuery,
  useCreateDistrictSectionMutation,
} from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import PortalButton from '@components/PortalButton'
const Map = dynamic(() => import('@components/Map'), { ssr: false })

const District = ({
  district,
  districtId,
}: {
  district: string
  districtId: string
}) => {
  const router = useRouter()
  const [opened, setOpened] = useState<boolean>(false)
    const [openAddLASectionModal, setAddOpenLASectionModal] =
      useState<boolean>(false)
  const { data: user } = useGetUserQuery()

  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
    refetch: refetchDistrict,
  } = useGetDistrictByIdQuery(districtId, { refetchOnMountOrArgChange: true })

  const [createDistrictSection, { isLoading: isLoadingCreateLASection }] = useCreateDistrictSectionMutation()


  return (
    <AdminLayout title={`${district} District - Editor Dashboard`}>
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="md:h-screen bg-slate-50 py-4 md:py-0">
          <PortalHeader
            title={`${district}`}
            subTitle="Please select Area you want to review"
          />
          <section className="px-2 py-2 sm:px-4">
            <div className="flex justify-between">
              <Button
                type="button"
                color="outline"
                className="md:w-1/4"
                onClick={() => {
                  router.replace({
                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${router.query.county}`,
                    query: {
                      ...router.query,
                    },
                  })
                }}
              >
                Go Back
              </Button>
              <Button
                type="button"
                color="outline"
                className="md:w-1/4"
                onClick={() => setAddOpenLASectionModal((o) => !o)}
              >
                Add LA Section
              </Button>
            </div>
          </section>
          {isLoadingDistrict ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <section className="md:h-[700px] w-full py-4  md:py-24 px-2 md:px-4">
              {districtData && (
                <section className="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-4">
                  <div className="h-full rounded bg-white p-2 shadow-md md:col-span-2">
                    <Map location={`${district}, UK`} />
                  </div>
                  <div className="w-full md:col-span-2 mb-2">
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-2">
                      {districtData?.districtSections?.map(
                        (section: DistrictSectionProps) => (
                          <PortalButton
                            key={`${section.id}`}
                            type="button"
                            color='primaryFilled'
                            onClick={() =>
                              router.push({
                                pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district/${section.id}`,
                                query: {
                                  county: router.query.county,
                                  countyId: router.query.countyId,
                                  district: districtData?.name,
                                  districtId: districtData?.id,
                                },
                              })
                            }
                          >
                            {section.name}
                          </PortalButton>
                        )
                      )}
                    </div>
                  </div>
                </section>
              )}
            </section>
          )}
        </section>
        <CreateLASectionForm
          opened={openAddLASectionModal}
          setOpened={setAddOpenLASectionModal}
          isLoading={isLoadingCreateLASection}
          createSection={createDistrictSection}
          refetch={refetchDistrict}
          id={districtData?.id as string}
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
  const { district, countyId, county, districtId } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {
      district: district,
      districtId: districtId,
      county: county,
      countyId: countyId,
    },
  }
}

export default District
