'use client'
import { Loader } from '@components/mantine-components'

import { CountyDataProps } from '@lib/types'
import { CountyTable } from './CountyTable'

// hooks (Controller)
import useCountySettingController from './use-county-setting-controller'

export function CountySettings() {
  const { counties, isLoadingCounties, isRemoving, deleteHandler } = useCountySettingController()

  if (isLoadingCounties) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }

  return (
    <>
      <CountyTable
        countyData={counties as CountyDataProps[]}
      />
    </>
  )
}
