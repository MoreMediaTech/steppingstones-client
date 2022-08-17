import React from 'react'
import { Modal } from '@mantine/core'
import { IFormData, PartnerData } from '@lib/types'
import { PartnerDirectoryForm } from '@components/forms'
import { DeepRequired, FieldErrorsImpl, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

const PartnerDirectoryModal = ({
  open,
  type,
  errors, 
  isLoading,
  register,
  handleSubmit,
  handleChange,
  submitHandler,
  handleModalClose,
}: {
  type: string
  open: boolean
  refetch: () => void
  handleModalClose: () => void
  errors: FieldErrorsImpl<DeepRequired<IFormData>>
  isLoading: boolean
  submitHandler: SubmitHandler<IFormData>
  register: UseFormRegister<IFormData>
  handleSubmit: UseFormHandleSubmit<IFormData>
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <Modal
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="90%"
      opened={open}
      onClose={handleModalClose}
      title={
        type === 'Create' ? 'Create Partner Data' : 'Update Partner Data'
      }
    >
      <PartnerDirectoryForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </Modal>
  )
}

export default PartnerDirectoryModal