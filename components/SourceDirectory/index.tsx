import React, { useState, useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Loader } from '@mantine/core'

import { useGetAllSDDataByTypeQuery } from 'features/editor/editorApiSlice'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { editorSelector, setSDData } from 'features/editor/editorSlice'
import SourceDirectoryTable from './SourceDirectoryTable'
import { SourceDataProps, SourceDirectoryType } from '@lib/types'
import SearchForm from './SearchForm'
import SourceDirectoryForm from '@components/forms/SourceDirectoryForm'
import SourceDirectoryUpdateModal from './SourceDirectoryUpdateModal'

export interface IFormDataProps extends SourceDataProps {
  type: SourceDirectoryType | string
}

const SourceDirectory = () => {
  const dispatch = useAppDispatch()
  const [sdDataType, setSdDataType] = useState<string>('BSI')
  const [searchResults, setSearchResults] = useState<SourceDataProps[]>([])
  const [selectedSDId, setSelectedSDId] = useState<string[]>([])
  const [checked, setChecked] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [action, setAction] = useState<'CREATE' | 'UPDATE'>('CREATE')
  const {
    data: sourceData,
    isLoading,
    error,
    refetch,
  } = useGetAllSDDataByTypeQuery(sdDataType)

  const { sdData } = useAppSelector(editorSelector)

  // const categories = sourceData?.map((item: SourceDataProps) => item.category)

  const { register, watch } = useForm<IFormDataProps>()

  useEffect(() => {
    const subscribe = watch((data) => {
      const { type } = data
      setSdDataType(type as string)
    })
    return () => subscribe.unsubscribe()
  }, [watch])

  // const handleCategoryChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     e.preventDefault()
  //     const category = watch('category')
  //     console.log(category)
  //     if (category === 'all') {
  //       setSearchResults([])
  //     } else {
  //       setSearchResults(
  //         sourceData?.filter(
  //           (item) => item.category === category
  //         ) as SourceDataProps[]
  //       )
  //     }
  //   },
  //   [watch]
  // )

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(sourceData as SourceDataProps[])

    const resultsArray = sourceData?.filter(
      (partner: SourceDataProps) =>
        partner?.description
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        partner?.category.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as SourceDataProps[])
  }, [])

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setChecked(false)
      setSelectedSDId([])
    }
    const { value } = e.target
    setChecked(true)
    setSelectedSDId((partnerId) => [...new Set([...partnerId, value])])
  }, [])

    const handleModalClose = () => {
      dispatch(setSDData(null))
      setOpenUpdateModal(false)
      setAction('CREATE')
    }
    const handleModalOpen = () => {
      setOpenUpdateModal(true)
      setAction('CREATE')
    }

  return (
    <>
      {isLoading ? (
        <div className="flex h-[700px] items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className="relative mx-auto  my-8   bg-white px-2 py-1 shadow-md sm:rounded-lg md:w-full">
          <SearchForm
            register={register}
            types={['BSI', 'IS', 'EU']}
            handleModalOpen={handleModalOpen}
          />
          <SourceDirectoryTable
            data={
              searchResults?.length > 0
                ? (searchResults as SourceDataProps[])
                : (sourceData as SourceDataProps[])
            }
            action={action}
            setAction={setAction}
            handleSearch={handleSearch}
            handleSelected={handleSelect}
            refetch={refetch}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </section>
      )}
      <SourceDirectoryUpdateModal
        action={action}
        open={openUpdateModal}
        refetch={refetch}
        types={['BSI', 'IS', 'EU']}
        data={sdData}
        handleModalClose={handleModalClose}
      />
    </>
  )
}

export default SourceDirectory
