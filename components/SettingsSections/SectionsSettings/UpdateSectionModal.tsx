import React from 'react'
import { Modal } from '@mantine/core'

import { SectionProps, SubSectionProps } from '@lib/types'
import { UpdateSectionForm } from '@components/forms'
import { useAppSelector } from 'app/hooks'
import { editorSelector } from 'features/editor/editorSlice'

const UpdateSectionModal = ({
  open,
  type,
  data,
  refetch,
  handleModalClose,
}: {
  type?: 'Section' | 'SubSection'
  data?: SubSectionProps | SectionProps
  open: boolean
  refetch: () => void
  handleModalClose: () => void
}) => {
  const { sectionType } = useAppSelector(editorSelector)
  return (
    <Modal
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="80%"
      opened={open}
      onClose={handleModalClose}
      title={
        sectionType === 'Section' ? 'Update Section' : 'Update Sub Section'
      }
    >
      <UpdateSectionForm
        refetch={refetch}
        sectionData={data}
        handleModalClose={handleModalClose}
        type={sectionType}
      />
    </Modal>
  )
}

export default UpdateSectionModal