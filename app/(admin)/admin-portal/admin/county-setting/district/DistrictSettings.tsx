'use client'



// zod schema
import { DistrictSchemaProps } from "@models/District";

// components
import { DistrictTable } from './DistrictTable'
import Loader from "@components/Loader";

// hooks (Controller)
import useDistrictSettingController from './use-district-setting-controller'


export function DistrictSettings() {
  const { districtData, isLoadingDistricts } = useDistrictSettingController()

  
  if (isLoadingDistricts) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    )
  }

  return (
    <>
      <DistrictTable districtData={districtData as DistrictSchemaProps[]} />
    </>
  );
}
