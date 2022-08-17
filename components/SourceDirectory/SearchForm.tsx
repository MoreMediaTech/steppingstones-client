import {
  UseFormRegister,
  UseFormReset,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form'

import FormRowSelect from '@components/forms/FormComponents/FormRowSelect'
import { IFormDataProps } from '.'
import Button from '@components/Button'

interface ISearchFormProps {
  types: string[]
  register: UseFormRegister<IFormDataProps>
  handleModalOpen: () => void
}

const SearchForm = ({
  register,
  types,
  handleModalOpen,
}: ISearchFormProps) => {
  return (
      <div className="relative mx-2  mt-5  max-w-screen-xl bg-white p-2 font-poppins md:mx-auto md:p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <FormRowSelect
            label="Source Type"
            type="type"
            {...register('type')}
            list={types}
          />
         <div></div>
         <Button color='primary' className='h-12 sm:mt-8' type='button' onClick={handleModalOpen}>Add SD Data</Button>
        </div>
      </div>
  )
}

export default SearchForm
