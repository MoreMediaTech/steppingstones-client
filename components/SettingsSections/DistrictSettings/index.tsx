'use client'
import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetDistrictsQuery } from 'app/global-state/features/editor/editorApiSlice'
import { DistrictDataProps } from '@lib/types'
import DistrictTable from './DistrictTable'
import UpdateDistrictModal from './UpdateDistrictModal'
import { useAppSelector, useAppDispatch } from '../../../app/global-state/hooks'
import {
  editorSelector,
  setDistrict,
} from '../../../app/global-state/features/editor/editorSlice'

const DistrictSettings = () => {
  const {
    data: districtData,
    isLoading: isLoadingDistricts,
    isError: isErrorDistricts,
    refetch: refetchDistricts,
  } = useGetDistrictsQuery()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<'District' | 'DistrictSection'>('District')

  const [searchResults, setSearchResults] = useState<DistrictDataProps[]>([])
  const { district } = useAppSelector(editorSelector)

  const handleModalClose = () => {
    setOpen(false)
    dispatch(setDistrict(null))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(districtData as DistrictDataProps[])

    const resultsArray = districtData?.filter(
      (district: DistrictDataProps) =>
        district?.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        district?.county?.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as DistrictDataProps[])
  }

  if (isErrorDistricts) {
    return (
      <div className="flex h-[700px] items-center justify-center text-xl font-bold text-red-500">
        <h1>Error loading Districts...</h1>
      </div>
    )
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
        districtData={
          searchResults.length > 0
            ? searchResults
            : (districtData as DistrictDataProps[])
        }
        setOpen={setOpen}
        refetch={refetchDistricts}
        type={type}
        setType={setType}
        handleSearch={handleSearch}
      />
      <UpdateDistrictModal
        key={district?.id}
        open={open}
        handleModalClose={handleModalClose}
        refetch={refetchDistricts}
        data={district as DistrictDataProps}
        type={type}
      />
    </>
  )
}

export default DistrictSettings
