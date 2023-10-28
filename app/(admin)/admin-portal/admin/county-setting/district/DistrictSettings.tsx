'use client'

import { Loader } from '@components/mantine-components'

// zod schema
import { DistrictSchemaProps } from "@models/District";

// components
import { DistrictTable } from './DistrictTable'

// hooks (Controller)
import useDistrictSettingController from './use-district-setting-controller'


export function DistrictSettings() {
  const { districtData, isLoadingDistricts } = useDistrictSettingController()

  
  if (isLoadingDistricts) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }

  return (
    <>
      <DistrictTable districtData={districtData as DistrictSchemaProps[]} />
    </>
  );
}
