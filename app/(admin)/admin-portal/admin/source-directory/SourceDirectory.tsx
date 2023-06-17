'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Loader } from '@components/mantine-components'

import { useGetAllSDDataByTypeQuery } from 'app/global-state/features/editor/editorApiSlice'
import { SourceDirectoryTable } from './SourceDirectoryTable'
import { SourceDataProps, SourceDirectoryType } from '@lib/types'
import SearchForm from './SearchForm'
import SourceDirectoryUpdateModal from './SourceDirectoryUpdateModal'

export interface IFormDataProps extends SourceDataProps {
  type: SourceDirectoryType | string
}

export function SourceDirectory() {
  const [sdDataType, setSdDataType] = useState<string>('BSI')

  const {
    data: sourceData,
    isLoading,
    refetch,
  } = useGetAllSDDataByTypeQuery(sdDataType)

  const { register, watch } = useForm<IFormDataProps>()

  useEffect(() => {
    const subscribe = watch((data) => {
      const { type } = data
      setSdDataType(type as string)
      refetch()
    })
    return () => subscribe.unsubscribe()
  }, [watch, sourceData, refetch])

  // const handleDeleteMany = useCallback(async () => {
  //   try {
  //     const response = await deleteManySDData({
  //       ids: selectedSDId,
  //       type: sdDataType,
  //     }).unwrap()
  //     if (response.success) {
  //       showNotification({
  //         message: 'Successfully deleted',
  //         color: 'success',
  //         autoClose: 3000,
  //       })
  //       refetch()
  //       setChecked(false)
  //       setSelectedSDId([])
  //     }
  //   } catch (error) {
  //     showNotification({
  //       message: 'Error deleting Source Directory Data',
  //       color: 'error',
  //       autoClose: 3000,
  //     })
  //   }
  // }, [checked, selectedSDId])

  return (
    <>
      <SearchForm register={register} types={['BSI', 'IS', 'EU']} />
      {isLoading ? (
        <div className="flex h-[700px] items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      ) : (
        <section className="relative mx-2 px-1 py-1 shadow-md  dark:text-gray-200 md:mx-auto md:w-full md:px-4">
          <SourceDirectoryTable
            data={sourceData as SourceDataProps[]}
            refetch={refetch}
          />
        </section>
      )}
      <SourceDirectoryUpdateModal
        refetch={refetch}
        types={['BSI', 'IS', 'EU']}
      />
    </>
  )
}
