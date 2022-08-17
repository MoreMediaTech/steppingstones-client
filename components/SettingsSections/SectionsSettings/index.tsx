import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetSectionsQuery } from 'features/editor/editorApiSlice'
import { SectionProps } from '@lib/types'
import SectionsTable from './SectionsTable'
import UpdateSectionModal from './UpdateSectionModal'

const SectionsSettings = () => {
  const {
    data: sectionData,
    isLoading: isLoadingSections,
    isError: isErrorSections,
    refetch: refetchSections,
  } = useGetSectionsQuery()
  const [open, setOpen] = useState<boolean>(false)
  const [section, setSection] = useState<SectionProps | null>(null)
  const [searchResults, setSearchResults] = useState<SectionProps[]>([])
  const [checked, setChecked] = useState<boolean>(false)
  const [selectedSectionId, setSelectedSectionId] = useState<string[]>([])

  const [type, setType] = useState<'Section' | 'SubSection'>('Section')

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
      setSelectedSectionId((sectionId) =>
        sectionId.filter((id) => id !== value)
      )
    } else {
      setChecked(true)
      setSelectedSectionId((sectionId) => [...new Set([...sectionId, value])])
    }
  }

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
        setType={setType}
        handleSearch={handleSearch}
        handleSelect={handleSelect}
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
