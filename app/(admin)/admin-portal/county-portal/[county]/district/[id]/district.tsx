'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Loader } from '@components/mantine-components'
import SectionContainer from 'app/(admin)/admin-portal/county-portal/[county]/section/section-container'
import EconomicDataSection from 'app/components/EconomicDataSection'
import CreateSectionForm from '../../CreateSectionForm'

import { DistrictSectionProps } from '@lib/types'
import {
  useGetDistrictSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateDistrictSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import Button from 'app/components/Button'
import Header from '@components/Header'

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

  const [opened, setOpened] = useState(false)
  const [type, setType] = useState<'create' | 'edit'>('create')
  const [createSubSection, { isLoading: isLoadingCreate }] =
    useCreateSubSectionMutation()
  const [updateDistrictSectionById, { isLoading }] =
    useUpdateDistrictSectionByIdMutation()

  return (
    <>
      <section className="mx-auto px-2 py-2 sm:max-w-screen-md sm:px-0">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Header title={laSectionData?.name as string} order={1} />
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
          <div className="flex items-center gap-2">
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
            <CreateSectionForm
              createSection={createSubSection}
              refetch={refetchSection}
              id={laSectionData?.id as string}
            />
          </div>
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
    </>
  )
}
