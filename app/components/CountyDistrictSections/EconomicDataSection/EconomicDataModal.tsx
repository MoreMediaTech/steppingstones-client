'use client';
import { EconomicDataWidgetProps } from '@lib/types'
import { Modal } from '@mantine/core'
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import EconomicDataForm from './EconomicDataForm'

interface IEconomicDataFormProps {
  submitHandler: SubmitHandler<EconomicDataWidgetProps>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  opened: boolean
  title: string
  register: UseFormRegister<EconomicDataWidgetProps>
  handleSubmit: UseFormHandleSubmit<EconomicDataWidgetProps>
}

const EconomicDataModal = ({
  opened,
  setOpened,
  submitHandler,
  isLoading,
  register,
  handleSubmit,
  title
}: IEconomicDataFormProps) => {
  return (
    <Modal
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
    >
      <EconomicDataForm
        setOpened={setOpened}
        submitHandler={submitHandler}
        isLoading={isLoading}
        register={register}
        handleSubmit={handleSubmit}
      />
    </Modal>
  )
}

export default EconomicDataModal
