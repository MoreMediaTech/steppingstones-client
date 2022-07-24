import { EconomicDataWidgetProps } from '@lib/types'
import { Modal } from '@mantine/core'
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import EconomicDataForm from './EconomicDataForm'

interface IEconomicDataFormProps {
  submitHandler: SubmitHandler<Partial<EconomicDataWidgetProps>>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  opened: boolean
  title: string
  register: UseFormRegister<Partial<EconomicDataWidgetProps>>
  handleSubmit: UseFormHandleSubmit<Partial<EconomicDataWidgetProps>>
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
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
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
