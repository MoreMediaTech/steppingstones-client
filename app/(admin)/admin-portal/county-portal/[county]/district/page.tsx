'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@mantine/core'
import dynamic from 'next/dynamic'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import Button from '@components/Button'
import { CreateLASectionForm } from '@components/forms'
import { DistrictSectionProps } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import {
  useGetDistrictByIdQuery,
  useCreateDistrictSectionMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import PortalButton from '@components/PortalButton'
import useHasMounted from '@hooks/useHasMounted'
const Map = dynamic(() => import('@components/Map'), { ssr: false })

// district, countyId, county, districtId

export default function District({
  searchParams,
}: {
  searchParams: {
    county: string
    countyId: string
    district: string
    districtId: string
  }
}) {
  const router = useRouter()

  const [openAddLASectionModal, setAddOpenLASectionModal] =
    useState<boolean>(false)
  const { data: user } = useGetUserQuery()

  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
    refetch: refetchDistrict,
  } = useGetDistrictByIdQuery(searchParams.districtId, {
    refetchOnMountOrArgChange: true,
  })

  const [createDistrictSection, { isLoading: isLoadingCreateLASection }] =
    useCreateDistrictSectionMutation()

  return (
    <ComponentShield
      RBAC
      showForRole={'SS_EDITOR'}
      userRole={user?.role as string}
    >
      <section className="py-4 md:h-screen md:py-0">
        <PortalHeader
          title={`${searchParams.district}`}
          subTitle="Please select Area you want to review"
        />
        <section className="px-2 py-2 sm:px-4">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className="md:w-1/4"
              onClick={() => {
                router.push(
                  `${NEXT_URL}/admin/editor-portal/county-portal/${searchParams.county}?countyId=${searchParams.countyId}`
                )
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
          <section className="w-full px-2 py-4  md:h-[700px] md:px-4 md:py-24">
            {districtData && (
              <section className="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-4">
                <div className="h-full rounded  p-2 shadow-md md:col-span-2">
                  <Map location={`${searchParams.district}, UK`} />
                </div>
                <div className="mb-2 w-full md:col-span-2">
                  <div className="grid w-full grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                    {districtData?.districtSections?.map(
                      (section: DistrictSectionProps) => (
                        <PortalButton
                          key={`${section.id}`}
                          type="button"
                          color="primaryFilled"
                          isLive={section.isLive}
                          onClick={() =>
                            router.push(
                              `${NEXT_URL}/admin/editor-portal/county-portal/${searchParams.county}/district/${section.id}?county=${searchParams.county}&countyId=${searchParams.countyId}&district=${searchParams.district}&districtId=${searchParams.districtId}`
                            )
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
  )
}
