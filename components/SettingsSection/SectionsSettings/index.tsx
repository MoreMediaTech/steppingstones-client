import React, { useState } from 'react'
import { Loader } from '@mantine/core'

import { useGetSectionsQuery } from 'features/editor/editorApiSlice'
import { SectionProps } from '@lib/types'
import SectionsTable from './SectionsTable'
import UpdateSectionModal from './UpdateSectionModal'

const SectionsSettings = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [section, setSection] = useState<SectionProps | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [type, setType] = useState<'Section' | 'SubSection'>('Section')

  const {
    data: sectionData,
    isLoading: isLoadingSections,
    isError: isErrorSections,
    refetch: refetchSections,
  } = useGetSectionsQuery()

   const handleModalClose = () => {
     setOpen(false)
     setSection(null)
   }


    //  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //    if (!e.target.value) setSearchResults(data as PartnerData[])

    //    const resultsArray = data?.filter(
    //      (partner: PartnerData) =>
    //        partner?.partner?.name
    //          .toLowerCase()
    //          .includes(e.target.value.toLowerCase()) ||
    //        partner?.partner?.email
    //          .toLowerCase()
    //          .includes(e.target.value.toLowerCase()) ||
    //        partner?.organisation?.name
    //          .toLowerCase()
    //          .includes(e.target.value.toLowerCase()) ||
    //        partner?.valueCategory
    //          .toLowerCase()
    //          .includes(e.target.value.toLowerCase()) ||
    //        partner?.position
    //          ?.toLowerCase()
    //          .includes(e.target.value.toLowerCase())
    //    )

    //    setSearchResults(resultsArray as PartnerData[])
    //  }

    //  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    //    if (!e.target.checked) {
    //      setChecked(false)
    //      setSelectedPartnersId([])
    //    }
    //    const { value } = e.target
    //    setChecked(true)
    //    setSelectedPartnersId((partnerId) => [...new Set([...partnerId, value])])
    //  }


    if (isErrorSections) {
      return (
        <div className="flex h-[700px] items-center justify-center text-xl font-bold text-red-500">
          <h1>Error loading Sections...</h1>
        </div>
      )
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
        sectionsData={sectionData as SectionProps[]}
        setOpen={setOpen}
        setSection={setSection}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        refetch={refetchSections}
        type={type}
        setType={setType}
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
