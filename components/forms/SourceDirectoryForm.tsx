import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import FormRowSelect from '@components/forms/FormComponents/FormRowSelect'
import FormInput from '@components/forms/FormComponents/FormInput'
import { IFormDataProps } from '../SourceDirectory'
import Button from '@components/Button'
import FormCheckbox from './FormComponents/FormCheckBox'
import {
  useCreateSDDataMutation,
  useUpdateSDDataMutation,
} from 'features/editor/editorApiSlice'
import { showNotification } from '@mantine/notifications'
import { SourceDirectoryType } from '@lib/types'

interface ISearchFormProps {
  action: string
  types: string[]
  currentSDData?: IFormDataProps
  refetch: () => void
  handleClose: () => void
}

const SourceDirectoryForm = ({
  action,
  types,
  currentSDData,
  refetch,
  handleClose,
}: ISearchFormProps) => {
  const [createSDData, { isLoading: isCreating }] = useCreateSDDataMutation()
  const [updateSDData, { isLoading: isUpdating }] = useUpdateSDDataMutation()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormDataProps>()

  useEffect(() => {
    if (action === 'CREATE') {
      reset({
        type: SourceDirectoryType.BSI,
        category: '',
        description: '',
        webLink: '',
        canEmail: false,
      })
    }
    if (action === 'UPDATE') {
      reset({
        ...currentSDData,
      })
    }
  }, [action])

  const submitHandler: SubmitHandler<IFormDataProps> = useCallback(
    async (data) => {
      try {
        let response
        if (action === 'CREATE') {
          response = await createSDData(data).unwrap()
        } else if (action === 'UPDATE') {
          const updatedData = {id: currentSDData?.id, ...data}
          response = await updateSDData(updatedData).unwrap()
        }
        refetch()
        reset()
        handleClose()
        showNotification({
          message: response?.message ?? 'Section added successfully',
          color: 'green',
          autoClose: 3000,
        })
      } catch (error) {
        showNotification({
          message: 'Error adding section',
          color: 'red',
          autoClose: 3000,
        })
      }
    },
    []
  )

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative mx-2  mt-5 w-full bg-white p-2 font-poppins md:mx-auto md:p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <FormRowSelect
            label="Source Type"
            type="type"
            {...register('type')}
            list={types}
          />
          <FormInput
            label="Category"
            title="category"
            type="text"
            {...register('category', {
              required: true,
              minLength: {
                value: 2,
                message: 'Please enter a category with at least 2 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%-^&*()._ -]+$/,
                message: 'Please enter a valid category',
              },
            })}
            errors={errors?.category}
          />
          <FormInput
            label="Description"
            type="text"
            title="description"
            {...register('description', {
              required: true,
              minLength: {
                value: 3,
                message:
                  'Please enter a description with at least 3 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%-^&*()._ -]+$/,
                message: 'Please enter a valid description',
              },
            })}
            errors={errors?.description}
          />
          <FormInput
            label="Web-Link"
            type="text"
            title="web-link"
            {...register('webLink', {
              required: true,
              pattern: {
                value:
                  /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                message: 'Please enter a valid website link',
              },
            })}
            errors={errors?.webLink}
          />
          <FormCheckbox
            label="Email Alerts"
            type="canEmail"
            classes="sm:mt-8 sm:ml-2"
            {...register('canEmail')}
          />

          <Button
            type="submit"
            className="h-10 sm:mt-8"
            color="primary"
            disabled={action === 'CREATE' ? isCreating : isUpdating}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SourceDirectoryForm
