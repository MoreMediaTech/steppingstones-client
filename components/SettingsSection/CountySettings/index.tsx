import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetCountiesQuery } from 'features/editor/editorApiSlice'
import { CountyDataProps } from '@lib/types'
import CountyTable from './CountyTable'
import UpdateCountyModal from './UpdateCountyModal'

const CountySettings = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [county, setCounty] = useState<CountyDataProps | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const {
    data: counties,
    isLoading: isLoadingCounties,
    isError: isErrorCounties,
    refetch: refetchCounties,
  } = useGetCountiesQuery()

  const handleModalClose = () => {
    setOpen(false)
    setCounty(null)
  }

  if(isErrorCounties) {
    return (
      <div className="flex h-[700px] items-center justify-center text-xl text-red-500 font-bold">
        <h1>Error loading counties...</h1>
      </div>
    )
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
        setOpen={setOpen}
        setCounty={setCounty}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        refetch={refetchCounties}
      />
      <UpdateCountyModal
        key={county?.id}
        open={open}
        handleModalClose={handleModalClose}
        refetch={refetchCounties}
        county={county as CountyDataProps}
      />
    </>
  )
}

export default CountySettings
