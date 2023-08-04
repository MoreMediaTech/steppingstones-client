'use client'
import { Loader } from '@components/mantine-components'

import { useGetCountiesQuery } from '@global-state/features/editor/editorApiSlice'
import { CountyDataProps } from '@lib/types'
import { CountyTable } from './CountyTable'

export function CountySettings() {
  const {
    data: counties,
    isLoading: isLoadingCounties,
    refetch: refetchCounties,
  } = useGetCountiesQuery()

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
        refetch={refetchCounties}
      />
    </>
  )
}
