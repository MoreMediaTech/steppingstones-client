'use client'
import React, { useCallback, useState } from 'react'
import { Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import {
  useGetSectionsQuery,
  useDeleteManySectionsMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { SectionProps } from '@lib/types'
import SectionsTable from './SectionsTable'
import UpdateSectionModal from './UpdateSectionModal'

export function SectionsSettings (){
  const {
    data: sectionData,
    isLoading: isLoadingSections,
    isError: isErrorSections,
    refetch: refetchSections,
  } = useGetSectionsQuery()
  const [open, setOpen] = useState<boolean>(false)
  const [section, setSection] = useState<SectionProps | null>(null)
  const [searchResults, setSearchResults] = useState<SectionProps[]>([])
  const [type, setType] = useState<'Section' | 'SubSection'>('Section')
  const [checked, setChecked] = useState<boolean>(false)
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([])

  const [deleteManySections, { isLoading: isDeleting }] =
    useDeleteManySectionsMutation()

  const handleModalClose = () => {
    setOpen(false)
    setSection(null)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearchResults(sectionData as SectionProps[])

    const resultsArray = sectionData?.filter((section: SectionProps) =>
      section?.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResults(resultsArray as SectionProps[])
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!e.target.checked) {
      setChecked(false)
      setSelectedSectionIds((sectionId) =>
        sectionId.filter((id) => id !== value)
      )
    } else {
      setChecked(true)
      setSelectedSectionIds((sectionId) => [...new Set([...sectionId, value])])
    }
  }

  const handleDeleteMany = useCallback(async () => {
    try {
      const response = await deleteManySections(selectedSectionIds).unwrap()
      if (response.success) {
        showNotification({
          message: 'Successfully deleted Partner Directory entries',
          color: 'success',
          autoClose: 3000,
        })
        refetchSections()
        setChecked(false)
        setSelectedSectionIds([])
      }
    } catch (error) {
      showNotification({
        message: 'Error deleting Partner Directory Data',
        color: 'error',
        autoClose: 3000,
      })
    }
  }, [checked, selectedSectionIds])

  if (isLoadingSections) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }

  return (
    <>
      <SectionsTable
        sectionsData={
          searchResults.length > 0
            ? (searchResults as SectionProps[])
            : (sectionData as SectionProps[])
        }
        setOpen={setOpen}
        setSection={setSection}
        refetch={refetchSections}
        type={type}
        checked={checked}
        setType={setType}
        handleSearch={handleSearch}
        handleSelect={handleSelect}
        handleDeleteMany={handleDeleteMany}
        selectedSectionIds={selectedSectionIds}
      />
      <UpdateSectionModal
        key={section?.id}
        open={open}
        handleModalClose={handleModalClose}
        refetch={refetchSections}
        data={section as SectionProps}
      />
    </>
  )
}

export default SectionsSettings
