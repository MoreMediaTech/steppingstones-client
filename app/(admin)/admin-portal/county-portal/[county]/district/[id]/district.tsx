'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@components/mantine-components'

import PortalHeader from 'app/components/PortalHeader'
import SectionContainer from 'app/(admin)/admin-portal/county-portal/[county]/section/section-container'
import EconomicDataSection from 'app/components/EconomicDataSection'
import { CreateSectionForm } from 'app/components/forms'

import { DistrictSectionProps } from '@lib/types'
import {
  useGetDistrictSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateDistrictSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import Button from 'app/components/Button'

type Props = {
  id: string
  county: string
  countyId: string
  district: string
  districtId: string
}

export default function District({
  id,
  county,
  countyId,
  district,
  districtId,
}: Props) {
  const router = useRouter()

  const {
    data: laSectionData,
    isLoading: isLoadingSection,
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetDistrictSectionByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  })

  const [openAddSectionModal, setAddOpenSectionModal] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(
    laSectionData?.isLive as boolean
  )
  const [opened, setOpened] = useState(false)
  const [type, setType] = useState<'create' | 'edit'>('create')
  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateDistrictSectionById, { isLoading }] =
    useUpdateDistrictSectionByIdMutation()

  return (
    <>
      <section className="h-screen overflow-auto">
        <PortalHeader
          title={`${laSectionData?.name ?? 'LA'} ${
            laSectionData?.name ?? 'Section'
          }`}
          subTitle="Review or edit the content below"
          data={laSectionData}
        />
        <section className="px-2 py-2 sm:px-0 sm:max-w-screen-md mx-auto">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className=" md:w-1/4 "
              onClick={() => {
                router.push(
                  `/admin-portal/county-portal/${county}/district?countyId=${countyId}&districtId=${districtId}&district=${district}&county=${county}`
                )
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
          {isLoadingSection ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <section className="w-full overflow-auto px-2 py-2 sm:px-0">
              <div className="flex justify-end px-2 md:px-4">
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
                <section className="w-full overflow-auto px-2 py-24 md:px-4">
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
      </section>
      <CreateSectionForm
        opened={openAddSectionModal}
        setOpened={setAddOpenSectionModal}
        isLoading={isLoadingCreate}
        createSection={createSubSection}
        refetch={refetchSection}
        id={laSectionData?.id as string}
      />
    </>
  )
}
