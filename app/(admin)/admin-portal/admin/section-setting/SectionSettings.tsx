'use client'
import { Loader } from '@components/mantine-components'

import {
  useGetSectionsQuery,
} from 'app/global-state/features/editor/editorApiSlice'
import { SectionProps } from '@lib/types'
import SectionsTable from './SectionsTable'
import UpdateSectionModal from './UpdateSectionModal'
import { useAppDispatch, useAppSelector } from 'app/global-state/hooks'
import { setSection, editorSelector, setOpenEditModal } from 'app/global-state/features/editor/editorSlice'

export function SectionsSettings() {
  const dispatch = useAppDispatch()
  const {
    data: sectionData,
    isLoading: isLoadingSections,
    refetch: refetchSections,
  } = useGetSectionsQuery()
  const { openEditModal, section } = useAppSelector(editorSelector)

  const handleModalClose = () => {
    dispatch(setOpenEditModal(false))
    dispatch(setSection(null))
  }


  // const handleDeleteMany = useCallback(async () => {
  //   try {
  //     const response = await deleteManySections(selectedSectionIds).unwrap()
  //     if (response.success) {
  //       showNotification({
  //         message: 'Successfully deleted Partner Directory entries',
  //         color: 'success',
  //         autoClose: 3000,
  //       })
  //       refetchSections()
  //       setChecked(false)
  //       setSelectedSectionIds([])
  //     }
  //   } catch (error) {
  //     showNotification({
  //       message: 'Error deleting Partner Directory Data',
  //       color: 'error',
  //       autoClose: 3000,
  //     })
  //   }
  // }, [checked, selectedSectionIds])

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
        refetch={refetchSections}
      />
      <UpdateSectionModal
        key={section?.id}
        open={openEditModal}
        handleModalClose={handleModalClose}
        refetch={refetchSections}
        data={section as SectionProps}
      />
    </>
  )
}

export default SectionsSettings
