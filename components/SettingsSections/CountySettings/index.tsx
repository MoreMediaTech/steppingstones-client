import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetCountiesQuery } from 'features/editor/editorApiSlice'
import { CountyDataProps } from '@lib/types'
import CountyTable from './CountyTable'
import UpdateCountyModal from './UpdateCountyModal'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { editorSelector, setCounty } from 'features/editor/editorSlice'

const CountySettings = () => {
  const {
    data: counties,
    isLoading: isLoadingCounties,
    isError: isErrorCounties,
    refetch: refetchCounties,
  } = useGetCountiesQuery()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<CountyDataProps[]>([])
  const { county } = useAppSelector(editorSelector)

  const handleModalClose = () => {
    setOpen(false)
    dispatch(setCounty(null))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(counties as CountyDataProps[])

    const resultsArray = counties?.filter((county: CountyDataProps) =>
      county?.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as CountyDataProps[])
  }

  if (isErrorCounties) {
    return (
      <div className="flex h-[700px] items-center justify-center text-xl font-bold text-red-500">
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
        countyData={
          searchResults.length > 0
            ? searchResults
            : (counties as CountyDataProps[])
        }
        setOpen={setOpen}
        refetch={refetchCounties}
        handleSearch={handleSearch}
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
