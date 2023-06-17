'use client'
import { UseFormRegister } from 'react-hook-form'
import { List } from '@mantine/core'

import FormRowSelect from 'app/components/forms/FormComponents/FormRowSelect'
import { IFormDataProps } from './SourceDirectory'
import Button from 'app/components/Button'
import { setOpenEditModal, setType } from 'app/global-state/features/editor/editorSlice'
import { useAppDispatch } from 'app/global-state/hooks'

interface ISearchFormProps {
  types: string[]
  register: UseFormRegister<IFormDataProps>
}

const SearchForm = ({ register, types }: ISearchFormProps) => {
  const dispatch = useAppDispatch()
  return (
    <div className="relative mx-2  mt-5  p-2 font-poppins dark:text-gray-100 md:mx-auto md:p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="w-full space-y-2">
          <FormRowSelect
            label="Source Type"
            type="type"
            {...register('type')}
            list={types}
          />
          <div className="font-poppins text-gray-400 dark:text-gray-100">
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
          onClick={() => {
            dispatch(setOpenEditModal(true))
            dispatch(setType('Create'))
          }}
        >
          Add SD Data
        </Button>
      </div>
    </div>
  )
}

export default SearchForm
