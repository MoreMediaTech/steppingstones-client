'use client'
import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetDistrictsQuery } from 'app/global-state/features/editor/editorApiSlice'
import { DistrictDataProps } from '@lib/types'
import { DistrictTable } from './DistrictTable'
import UpdateDistrictModal from './UpdateDistrictModal'
import { useAppSelector, useAppDispatch } from '../../../../global-state/hooks'
import {
  editorSelector,
  setDistrict,
  setOpenEditModal,
} from '../../../../global-state/features/editor/editorSlice'

export function DistrictSettings() {
  const {
    data: districtData,
    isLoading: isLoadingDistricts,
    refetch: refetchDistricts,
  } = useGetDistrictsQuery()
  const dispatch = useAppDispatch()
  const [type, setType] = useState<'District' | 'DistrictSection'>('District')

  const { district, openEditModal } = useAppSelector(editorSelector)

  const handleModalClose = () => {
    dispatch(setOpenEditModal(false))
    dispatch(setDistrict(null))
  }

  if (isLoadingDistricts) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }

  return (
    <>
      <DistrictTable
        districtData={districtData as DistrictDataProps[]}
        refetch={refetchDistricts}
        type={type}
        setType={setType}
      />
      <UpdateDistrictModal
        key={district?.id}
        open={openEditModal}
        handleModalClose={handleModalClose}
        refetch={refetchDistricts}
        data={district as DistrictDataProps}
        type={type}
      />
    </>
  )
}
