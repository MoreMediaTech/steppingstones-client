import {
  Button,
  Divider,
  Indicator,
  NumberInput,
  Textarea,
  TextInput,
} from '@mantine/core'
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

import { EconomicDataWidgetProps } from '@lib/types'

interface IEconomicDataFormProps {
  submitHandler: SubmitHandler<Partial<EconomicDataWidgetProps>>
  errors?: {
    title: FieldError | undefined
    stats: FieldError | undefined
    description: FieldError | undefined
    link: FieldError | undefined
  }
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  register: UseFormRegister<Partial<EconomicDataWidgetProps>>
  handleSubmit: UseFormHandleSubmit<Partial<EconomicDataWidgetProps>>
}

const EconomicDataForm = ({
  submitHandler,

  isLoading,
  register,
  handleSubmit,
  setOpened,
}: IEconomicDataFormProps) => {
  return (
    <form className="space-y-8" onSubmit={handleSubmit(submitHandler)}>
      <Divider />
      <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          aria-label="title"
          id="title"
          {...register('title', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%+?:/^&*()._ -]+$/,
              message: 'Please enter a valid title',
            },
          })}
          className="w-full appearance-none rounded-md border border-gray-300  p-2 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row">
        <label htmlFor="stats">Stats</label>
        <input
          type="text"
          aria-label="stats"
          id="stats"
          {...register('stats', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$£%+?:/^&*()._ -]+$/,
              message: 'Please enter valid stats',
            },
          })}
          className="w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row">
        <label htmlFor="description-line-one">Description Line 1</label>
        <input
          type="text"
          aria-label="description-line-one"
          id="description-line-one"
          {...register('descriptionLine1', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%?=+:/^&*()._ -]+$/,
              message: 'Please enter a valid description',
            },
          })}
          className="w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row">
        <label htmlFor="description-line-two">Description Line 2</label>
        <input
          type="text"
          aria-label="description-line-two"
          id="description-line-two"
          {...register('descriptionLine2', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%?=^&*()._ -]+$/,
              message: 'Please enter a valid description',
            },
          })}
          className="w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row">
        <label htmlFor="link-name">Link Name</label>
        <input
          type="text"
          aria-label="link-name"
          id="link-name"
          {...register('linkName', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%/?^&*()._ -]+$/,
              message: 'Please enter a valid link name',
            },
          })}
          className="w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-start justify-between gap-x-4 md:flex-row">
        <label htmlFor="link-url">Link Url</label>
        <input
          type="text"
          aria-label="link-url"
          id="link-url"
          {...register('linkUrl', {
            pattern: {
              value:
                /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
              message: 'Please enter a valid link url',
            },
          })}
          className="w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />

      <div className="my-4 flex w-full items-center justify-between gap-4">
        <Button
          type="button"
          fullWidth
          className=" rounded-md border border-red-700 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          onClick={() => {
            setOpened(false)
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className=" rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default EconomicDataForm
