'use client'
import { Loader } from '@components/mantine-components'

import { useGetCountiesQuery } from 'app/global-state/features/editor/editorApiSlice'
import { CountyDataProps } from '@lib/types'
import { CountyTable } from './CountyTable'
import { UpdateCountyModal } from './UpdateCountyModal'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  editorSelector,
  setCounty,
  setOpenEditModal,
} from 'app/global-state/features/editor/editorSlice'

export function CountySettings() {
  const {
    data: counties,
    isLoading: isLoadingCounties,
    refetch: refetchCounties,
  } = useGetCountiesQuery()
  const dispatch = useAppDispatch()

  const { county, openEditModal } = useAppSelector(editorSelector)

  const handleModalClose = () => {
    dispatch(setOpenEditModal(false))
    dispatch(setCounty(null))
  }

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
      <UpdateCountyModal
        key={county?.id}
        open={openEditModal}
        handleModalClose={handleModalClose}
        refetch={refetchCounties}
        county={county as CountyDataProps}
      />
    </>
  )
}
