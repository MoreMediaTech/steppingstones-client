import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Loader } from '@mantine/core'

import {
  useGetAllSDDataByTypeQuery,
  useDeleteManySDDataMutation,
} from 'features/editor/editorApiSlice'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { editorSelector, setSDData } from 'features/editor/editorSlice'
import SourceDirectoryTable from './SourceDirectoryTable'
import { SourceDataProps, SourceDirectoryType } from '@lib/types'
import SearchForm from './SearchForm'
import SourceDirectoryUpdateModal from './SourceDirectoryUpdateModal'
import useWindowSize from 'hooks/useWindowSize'

export interface IFormDataProps extends SourceDataProps {
  type: SourceDirectoryType | string
}

const SourceDirectory: React.FC = () => {
  const dispatch = useAppDispatch()
  const [sdDataType, setSdDataType] = useState<string>('BSI')
  const [searchResults, setSearchResults] = useState<SourceDataProps[]>([])
  const [selectedSDId, setSelectedSDId] = useState<string[]>([])
  const [checked, setChecked] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [action, setAction] = useState<'CREATE' | 'UPDATE'>('CREATE')
  const [windowSize] = useWindowSize()
  const {
    data: sourceData,
    isLoading,
    error,
    refetch,
  } = useGetAllSDDataByTypeQuery(sdDataType)
  const [deleteManySDData, { isLoading: isLoadingDeleteMany }] =
    useDeleteManySDDataMutation()

  const { sdData } = useAppSelector(editorSelector)

  const { register, watch } = useForm<IFormDataProps>()

  useEffect(() => {
    const subscribe = watch((data) => {
      const { type } = data
      setSdDataType(type as string)
      refetch()
    })
    return () => subscribe.unsubscribe()
  }, [watch, sourceData, refetch])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) setSearchResults(sourceData as SourceDataProps[])

      const resultsArray = sourceData?.filter(
        (source: SourceDataProps) =>
          source?.description
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          source?.category.toLowerCase().includes(e.target.value.toLowerCase())
      )

      setSearchResults(resultsArray as SourceDataProps[])
    },
    [sourceData]
  )

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setChecked(false)
      setSelectedSDId([])
    } else {
      const { value } = e.target
      setChecked(true)
      setSelectedSDId((partnerId) => [...new Set([...partnerId, value])])
    }
  }

  const handleModalClose = () => {
    dispatch(setSDData(null))
    setOpenUpdateModal(false)
    setAction('CREATE')
  }
  const handleModalOpen = () => {
    setOpenUpdateModal(true)
    setAction('CREATE')
  }

  const handleDeleteMany = useCallback(async () => {
    try {
      const response = await deleteManySDData({
        ids: selectedSDId,
        type: sdDataType,
      }).unwrap()
      if (response.success) {
        showNotification({
          message: 'Successfully deleted',
          color: 'success',
          autoClose: 3000,
        })
        refetch()
        setChecked(false)
        setSelectedSDId([])
      }
    } catch (error) {
      showNotification({
        message: 'Error deleting Source Directory Data',
        color: 'error',
        autoClose: 3000,
      })
    }
  }, [checked, selectedSDId])

  return (
    <>
        <SearchForm
          register={register}
          types={['BSI', 'IS', 'EU']}
          handleModalOpen={handleModalOpen}
        />
        {isLoading ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
            <section
              className="relative mx-2 md:mx-auto bg-primary-light-50 px-1 md:px-4 py-1 shadow-md dark:bg-primary-dark-600 dark:text-primary-light-100 md:w-full"
            >
          <SourceDirectoryTable
            data={
              searchResults?.length > 0
                ? (searchResults as SourceDataProps[])
                : (sourceData as SourceDataProps[])
            }
            action={action}
            checked={checked}
            selectedSDId={selectedSDId}
            setAction={setAction}
            handleSearch={handleSearch}
            handleSelected={handleSelect}
            refetch={refetch}
            setOpenUpdateModal={setOpenUpdateModal}
            handleDeleteMany={handleDeleteMany}
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
