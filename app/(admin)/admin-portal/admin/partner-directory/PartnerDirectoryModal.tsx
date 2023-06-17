'use client'
import React from 'react'
import { Modal } from '@components/mantine-components'
import { IFormData } from '@lib/types'
import { PartnerDirectoryForm } from 'app/components/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useCreatePartnerDataMutation,
  useUpdatePartnerDataMutation,
} from 'app/global-state/features/partner/partnerApiSlice'
import { showNotification } from '@components/mantine-components'
import { useAppSelector } from 'app/global-state/hooks'
import { editorSelector } from 'app/global-state/features/editor/editorSlice'

interface Props {
  open: boolean
  refetch: () => void
  handleModalClose: () => void
}

const PartnerDirectoryModal = ({
  open,
  refetch,
  handleModalClose,
}: Props) => {
  const [createPartnerData, { isLoading }] = useCreatePartnerDataMutation()
  const [updatePartnerData, { isLoading: isLoadingUpdate }] =
    useUpdatePartnerDataMutation()
  const { partner, type } = useAppSelector(editorSelector)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()

  React.useEffect(() => {
    if (type === 'Create') {
      reset({
        name: '',
        email: '',
        organisation: '',
        position: '',
        projectsResponsibleFor: '',
        closingDate: new Date(),
      })
    }
    if (type === 'Update') {
      reset({
        name: partner?.partner?.name,
        email: partner?.partner?.email,
        organisation: partner?.organisation?.name,
        position: partner?.position,
        projectsResponsibleFor: partner?.projectsResponsibleFor,
        closingDate: new Date(partner?.closingDate as Date),
      })
    }
  }, [type])

  // function that handles the creation of a new partner or updates an existing partner
  const submitHandler: SubmitHandler<IFormData> = React.useCallback(
    async (data) => {
      const newData = {
        id: partner?.id,
        ...data,
      }
      let response
      try {
        if (type === 'Create') {
          response = await createPartnerData(data).unwrap()
        }
        if (type === 'Update') {
          response = await updatePartnerData(newData).unwrap()
        }
        handleModalClose()
        refetch()
        showNotification({
          message: response?.message,
          color: 'green',
          autoClose: 3000,
        })
      } catch (error) {
        showNotification({
          message: 'Something went wrong! Please try again',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    [type]
  )

  return (
    <Modal
      size="90%"
      opened={open}
      onClose={handleModalClose}
      title={type === 'Create' ? 'Create Partner Data' : 'Update Partner Data'}
    >
      <PartnerDirectoryForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isLoading={type === 'Create' ? isLoading : isLoadingUpdate}
      />
    </Modal>
  )
}

export default PartnerDirectoryModal
