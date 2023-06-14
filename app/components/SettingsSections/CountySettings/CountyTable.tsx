'use client'
import React, { useState, useCallback, MouseEventHandler } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { Button } from '@mantine/core'
import Image from 'next/image'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { BiChevronUpSquare, BiChevronDownSquare } from 'react-icons/bi'

import steppingstonesapplogo from '../../../../public/steppingstonesapplogo.png'
import { CountyDataProps } from '@lib/types'
import { useRemoveCountyMutation } from 'app/global-state/features/editor/editorApiSlice'
import { showNotification } from '@mantine/notifications'
import HandleDeleteModal from '../../HandleDeleteModal/HandleDeleteModal'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import {
  editorSelector,
  setOpenModal,
} from 'app/global-state/features/editor/editorSlice'
import useWindowSize from 'hooks/useWindowSize'
import { columns } from './table-columns'
import { DataTable } from '@components/table/data-table'

interface CountyTableProps {
  countyData: CountyDataProps[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CountyTable = ({
  countyData,
  setOpen,
  refetch,
  handleSearch,
}: CountyTableProps) => {
  const dispatch = useAppDispatch()

  const [removeCounty, { isLoading }] = useRemoveCountyMutation()
  const { county, openModal } = useAppSelector(editorSelector)

  const deleteHandler = useCallback(async (id: string) => {
    try {
      await removeCounty(id).unwrap()
      refetch()
      dispatch(setOpenModal(false))
      showNotification({
        message: 'Section deleted successfully',
        color: 'green',
        autoClose: 3000,
      })
    } catch (error) {
      showNotification({
        message: 'Error deleting section',
        color: 'red',
        autoClose: 3000,
      })
    }
  }, [])

  return (
    <>
      <DataTable columns={columns} data={countyData} name="name" />

      {openModal && (
        <HandleDeleteModal
          open={openModal}
          data={county}
          deleteHandler={deleteHandler}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default CountyTable
