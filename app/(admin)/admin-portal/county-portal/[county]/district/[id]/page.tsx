'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import SectionContainer from '@components/CountyDistrictSections/SectionContainer'
import { EconomicDataSection } from '@components/CountyDistrictSections'
import { CreateSectionForm } from '@components/forms'

import { DistrictSectionProps } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import {
  useGetDistrictSectionByIdQuery,
  useCreateSubSectionMutation,
  useUpdateDistrictSectionByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import Button from '@components/Button'

export default function DistrictSection({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: {
    county: string
    countyId: string
    district: string
    districtId: string
  }
}) {
  const router = useRouter()

  const { data: user } = useGetUserQuery()
  const {
    data: laSectionData,
    isLoading: isLoadingSection,
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetDistrictSectionByIdQuery(params.id, {
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
    <ComponentShield RBAC showForRole={'SS_EDITOR'} userRole={user?.role ?? ''}>
      <section className="h-screen overflow-auto">
        <PortalHeader
          title={`${laSectionData?.name ?? 'LA'} ${
            laSectionData?.name ?? 'Section'
          }`}
          subTitle="Review or edit the content below"
          data={laSectionData}
        />
        <section className="px-2 py-2 sm:px-4">
          <div className="flex justify-between">
            <Button
              type="button"
              color="outline"
              className=" md:w-1/4 "
              onClick={() => {
                router.push(
                  `${NEXT_URL}/admin-portal/county-portal/${searchParams.county}/district?countyId=${searchParams.countyId}&districtId=${searchParams.districtId}&district=${searchParams.district}&county=${searchParams.county}`
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
        </section>
        {isLoadingSection ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <section className="w-full overflow-auto px-2 py-2 md:px-4">
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
      <CreateSectionForm
        opened={openAddSectionModal}
        setOpened={setAddOpenSectionModal}
        isLoading={isLoadingCreate}
        createSection={createSubSection}
        refetch={refetchSection}
        id={laSectionData?.id as string}
      />
    </ComponentShield>
  )
}
