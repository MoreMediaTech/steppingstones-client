import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetDistrictsQuery } from 'features/editor/editorApiSlice'
import { DistrictDataProps } from '@lib/types'
import DistrictTable from './DistrictTable'
import UpdateDistrictModal from './UpdateDistrictModal'

const DistrictSettings = () => {
   const [open, setOpen] = useState<boolean>(false)
   const [district, setDistrict] = useState<DistrictDataProps | null>(null)
   const [searchValue, setSearchValue] = useState<string>('')
   const [type, setType] = useState<'District' | 'DistrictSection'>('District')

   const { data: districtData, isLoading: isLoadingDistricts, isError: isErrorDistricts, refetch: refetchDistricts} = useGetDistrictsQuery()

    const handleModalClose = () => {
      setOpen(false)
      setDistrict(null)
    }

      // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      //   if (!e.target.value) setSearchResults(data as PartnerData[])

      //   const resultsArray = data?.filter(
      //     (partner: PartnerData) =>
      //       partner?.partner?.name
      //         .toLowerCase()
      //         .includes(e.target.value.toLowerCase()) ||
      //       partner?.partner?.email
      //         .toLowerCase()
      //         .includes(e.target.value.toLowerCase()) ||
      //       partner?.organisation?.name
      //         .toLowerCase()
      //         .includes(e.target.value.toLowerCase()) ||
      //       partner?.valueCategory
      //         .toLowerCase()
      //         .includes(e.target.value.toLowerCase()) ||
      //       partner?.position
      //         ?.toLowerCase()
      //         .includes(e.target.value.toLowerCase())
      //   )

      //   setSearchResults(resultsArray as PartnerData[])
      // }

      // const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      //   if (!e.target.checked) {
      //     setChecked(false)
      //     setSelectedPartnersId([])
      //   }
      //   const { value } = e.target
      //   setChecked(true)
      //   setSelectedPartnersId((partnerId) => [
      //     ...new Set([...partnerId, value]),
      //   ])
      // }

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
        districtData={districtData as DistrictDataProps[]}
        setOpen={setOpen}
        setDistrict={setDistrict}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        refetch={refetchDistricts}
        type={type}
        setType={setType}
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
