import {
  UseFormRegister,
  UseFormReset,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form'
import { List } from '@mantine/core';

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
    <div className="relative mx-2  mt-5  bg-primary-light-50 p-2 font-poppins dark:bg-primary-dark-600 dark:text-primary-light-100 md:mx-auto md:p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="w-full space-y-2">
          <FormRowSelect
            label="Source Type"
            type="type"
            {...register('type')}
            list={types}
          />
          <div className="font-poppins text-gray-400 dark:text-primary-light-100">
            <h3 className="text-semi-bold">Source Types Descriptions</h3>
            <List size="xs" className="space-y-1 text-gray-400">
              <List.Item>BSI - Business Support Information</List.Item>
              <List.Item>IS - Industry Sector</List.Item>
              <List.Item>EU - Economic Update</List.Item>
            </List>
          </div>
        </div>
        <div></div>
        <Button
          color="outline"
          className="h-12 sm:mt-8"
          type="button"
          onClick={handleModalOpen}
        >
          Add SD Data
        </Button>
      </div>
    </div>
  )
}

export default SearchForm
