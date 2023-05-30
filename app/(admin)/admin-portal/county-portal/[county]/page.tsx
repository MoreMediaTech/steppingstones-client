'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import { AddDistrictForm, CreateSectionForm } from '@components/forms'
import Button from '@components/Button'

import { DistrictDataProps, SectionProps } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import {
  useGetCountyByIdQuery,
  useCreateSectionMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import PortalButton from '@components/PortalButton'
import Map from '@components/Map'

export default function County({
  params,
  searchParams,
}: {
  params: { county: string }
  searchParams: { countyId: string }
}) {
  const router = useRouter()
  const [opened, setOpened] = useState<boolean>(false)
  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)

  const { data: user } = useGetUserQuery()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(searchParams.countyId, {
    refetchOnMountOrArgChange: true,
  })

  const [createSection, { isLoading: isLoadingCreateSection }] =
    useCreateSectionMutation()
  const districts = countyData?.districts.map((district) => district.name)

  return (
    <ComponentShield RBAC showForRole={'SS_EDITOR'} userRole={user?.role ?? ''}>
      <section className="h-screen overflow-auto">
        <PortalHeader
          title={`${countyData?.name} Portal` ?? 'County Portal'}
          subTitle="Please select district from the menu below"
          data={countyData}
        />
        <section className="mt-4 px-2 py-2 sm:px-4">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className=" md:w-1/4 "
              onClick={() => {
                router.push(`${NEXT_URL}/admin/editor-portal/county-portal`)
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
                Add Section
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
          <section className=" w-full overflow-auto px-2 py-4 md:px-4 md:py-24">
            {countyData && (
              <div className="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-4">
                <div className="h-full rounded bg-primary-light-50 p-2 shadow-md dark:bg-primary-dark-600 md:col-span-2">
                  <Map
                    location={`${params.county}, UK`}
                    districtsArray={districts as string[]}
                  />
                </div>
                <div className="h-full w-full md:col-span-2">
                  <div className="flex flex-col">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <PortalButton
                        type="button"
                        color="primaryFilled"
                        isLive={countyData.welcome?.isLive}
                        onClick={() => {
                          router.push(
                            `${NEXT_URL}/admin-portal/county-portal/${params.county}/welcome?countyId=${searchParams.countyId}&county=${params.county}`
                          )
                        }}
                      >
                        Welcome
                      </PortalButton>
                      <PortalButton
                        type="button"
                        color="primaryFilled"
                        isLive={countyData.lep?.isLive}
                        onClick={() => {
                          router.push(
                            `${NEXT_URL}/admin-portal/county-portal/${params.county}/lep?countyId=${searchParams.countyId}&county=${params.county}`
                          )
                        }}
                      >
                        LEP
                      </PortalButton>
                      <PortalButton
                        type="button"
                        color="primaryFilled"
                        isLive={countyData.news?.isLive}
                        onClick={() => {
                          router.push(
                            `${NEXT_URL}/admin-portal/county-portal/${params.county}/news?countyId=${searchParams.countyId}&county=${params.county}`
                          )
                        }}
                      >
                        NEWS
                      </PortalButton>
                    </div>
                    <div className="w-full space-y-4 py-8">
                      <div className="grid grid-cols-2 gap-x-10 gap-y-4 ">
                        {countyData?.districts?.map(
                          (district: DistrictDataProps) => (
                            <PortalButton
                              key={district?.id}
                              type="button"
                              color="primaryFilled"
                              isLive={district?.isLive}
                              onClick={() =>
                                router.push(
                                  `${NEXT_URL}/admin-portal/county-portal/${params.county}/district?countyId=${searchParams.countyId}&county=${params.county}&district=${district?.name}&districtId=${district?.id}`
                                )
                              }
                            >
                              {district?.name}
                            </PortalButton>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-3">
                        {countyData?.sections?.map((section: SectionProps) => (
                          <PortalButton
                            key={`${section?.id}`}
                            type="button"
                            color="primaryFilled"
                            isLive={section?.isLive}
                            onClick={() =>
                              router.push(
                                `${NEXT_URL}/admin-portal/county-portal/${params.county}/section?countyId=${searchParams.countyId}&county=${params.county}&section=${section.name}&sectionId=${section.id}`
                              )
                            }
                          >
                            {section?.name}
                          </PortalButton>
                        ))}
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
        countyId={searchParams.countyId}
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
  )
}
