'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

import { AddDistrictForm, CreateSectionForm } from 'app/components/forms'
import Button from 'app/components/Button'
import PortalHeader from 'app/components/PortalHeader'
import { DistrictDataProps, SectionProps } from '@lib/types'
import {
  useGetCountyByIdQuery,
  useCreateSectionMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import PortalButton from 'app/components/PortalButton'
import Map from 'app/components/Map'

type Props = {
  county: string
  countyId: string
}

export default function County({
  county,
  countyId,
}: Props) {
  const router = useRouter()
  const [opened, setOpened] = useState<boolean>(false)
  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)

  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(countyId, {
    refetchOnMountOrArgChange: true,
  })

  const [createSection, { isLoading: isLoadingCreateSection }] =
    useCreateSectionMutation()
  const districts = countyData?.districts.map((district) => district.name)

  return (
    <>
      <PortalHeader
        title={`${countyData?.name} Portal` ?? 'County Portal'}
        subTitle="Please select district from the menu below"
        data={countyData}
      />

      <section className="mx-auto mt-4 max-w-screen-md px-2 py-2 sm:px-4">
        <div className="flex justify-between">
          <Button
            type="button"
            color="outline"
            className=" md:w-1/4 "
            onClick={() => {
              router.push(`/admin-portal/county-portal`)
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
        <div className="mx-auto flex h-[700px] max-w-screen-md items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className=" mx-auto w-full max-w-screen-md overflow-auto px-2 py-4 md:px-4 md:py-24">
          {countyData && (
            <div className="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-4">
              <div className="h-full rounded  p-2 shadow-lg dark:shadow-gray-500 md:col-span-2">
                <Map
                  location={`${county}, UK`}
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
                          `/admin-portal/county-portal/${county}/welcome?countyId=${countyId}&county=${county}`
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
                          `/admin-portal/county-portal/${county}/lep?countyId=${countyId}&county=${county}`
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
                          `/admin-portal/county-portal/${county}/news?countyId=${countyId}&county=${county}`
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
                                `/admin-portal/county-portal/${county}/district?countyId=${countyId}&county=${county}&district=${district?.name}&districtId=${district?.id}`
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
                              `/admin-portal/county-portal/${county}/section?countyId=${countyId}&county=${county}&section=${section.name}&sectionId=${section.id}`
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
    </>
  )
}
