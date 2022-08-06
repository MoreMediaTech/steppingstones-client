import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetDistrictsQuery } from 'features/editor/editorApiSlice'
import { DistrictDataProps } from '@lib/types'
import DistrictTable from './DistrictTable'
import UpdateDistrictModal from './UpdateDistrictModal'

const DistrictSettings = () => {
  const {
    data: districtData,
    isLoading: isLoadingDistricts,
    isError: isErrorDistricts,
    refetch: refetchDistricts,
  } = useGetDistrictsQuery()
  const [open, setOpen] = useState<boolean>(false)
  const [district, setDistrict] = useState<DistrictDataProps | null>(null)
  const [type, setType] = useState<'District' | 'DistrictSection'>('District')
  const [checked, setChecked] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<DistrictDataProps[]>([])
  const [selectedDistrictId, setSelectedDistrictId] = useState<string[]>([])

  const handleModalClose = () => {
    setOpen(false)
    setDistrict(null)
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

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!e.target.checked) {
      setChecked(false)
      setSelectedDistrictId(districtId => districtId.filter(id => id !== value))
    } else {
      setChecked(true)
      setSelectedDistrictId((partnerId) => [...new Set([...partnerId, value])])
    }
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
        setDistrict={setDistrict}
        refetch={refetchDistricts}
        type={type}
        setType={setType}
        handleSearch={handleSearch}
        handleSelect={handleSelect}
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
