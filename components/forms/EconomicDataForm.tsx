import { Button, Divider, Indicator, NumberInput, Textarea, TextInput } from '@mantine/core'
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { MdCloudUpload } from 'react-icons/md'
import Image from 'next/image'

import RichText from '@components/RichText'
import {EconomicDataProps } from '@lib/types'
import { clearState } from 'features/upload/uploadSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

interface IEconomicDataForm {
  submitHandler: SubmitHandler<EconomicDataProps>
  errors?: {
    workingAgePopulation: FieldError | undefined
    labourDemand: FieldError | undefined
    noOfRetailShops: FieldError | undefined
    employmentInvestmentLand: FieldError | undefined
    unemploymentRate: FieldError | undefined
    numOfRegisteredCompanies: FieldError | undefined
    numOfBusinessParks: FieldError | undefined
    averageHousingCost: FieldError | undefined
    averageWageEarnings: FieldError | undefined
  }
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  register: UseFormRegister<EconomicDataProps>
  handleSubmit: UseFormHandleSubmit<EconomicDataProps>
}

const EconomicDataForm = ({
  submitHandler,

  isLoading,
  register,
  handleSubmit,
  setIsEdit,
}: IEconomicDataForm) => {
  return (
    <form className="space-y-8" onSubmit={handleSubmit(submitHandler)}>
      <div className="p-2 font-semibold">
        <h1>Content</h1>
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="working-age-population" className="md:w-2/5">
          Working Age Population
        </label>
        <input
          type="number"
          aria-label="working-age-population"
          id="working-age-population"
          step={0.01}
          {...register('workingAgePopulation', {
            pattern: {
              value: /^(\d+(\.\d+)?)+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5 appearance-none"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="labour-demand" className="md:w-2/5">
          Labour Demand
        </label>
        <input
          type="number"
          aria-label="labour-demand"
          id="labour-demand"
          {...register('labourDemand', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="no-of-retail-shops" className="md:w-2/5">
          Number Of Retail Shops
        </label>
        <input
          type="number"
          aria-label="no-of-retail-shops"
          id="no-of-retail-shops"
          {...register('noOfRetailShops', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="employment-investment-land" className="md:w-2/5">
          Employment Investment Land
        </label>
        <input
          type="number"
          aria-label="employment-investment-land"
          id="employment-investment-land"
          {...register('employmentInvestmentLand', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="unemployment-rate" className="md:w-2/5">
          Unemployment Rate
        </label>
        <input
          type="number"
          aria-label="unemployment-rate"
          id="unemployment-rate"
          {...register('unemploymentRate', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="num-of-registered-companies" className="md:w-2/5">
          Number Of Registered Companies
        </label>
        <input
          type="number"
          aria-label="num-of-registered-companies"
          id="num-of-registered-companies"
          {...register('numOfRegisteredCompanies', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="num-of-business-parks" className="md:w-2/5">
          Number Of Business Parks
        </label>
        <input
          type="number"
          aria-label="num-of-business-parks"
          id="num-of-business-parks"
          {...register('numOfBusinessParks', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="average-housing-cost" className="md:w-2/5">
          Average Housing Cost
        </label>
        <input
          type="number"
          aria-label="average-housing-cost"
          id="average-housing-cost"
          {...register('averageHousingCost', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
        <label htmlFor="average-wage-earnings" className="md:w-2/5">
          Average Wage Earnings
        </label>
        <input
          type="number"
          aria-label="average-wage-earnings"
          id="average-wage-earnings"
          {...register('averageWageEarnings', {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: 'Please enter a valid District name',
            },
          })}
          className="m-2 w-full rounded-md border border-gray-300 p-2  shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 md:w-3/5"
        />
      </div>
      <Divider />

      <div className="my-4 flex w-full items-center justify-between ">
        <div>
          <Button
            type="button"
            fullWidth
            className=" rounded-md border border-red-700 bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>
        </div>
        <div className="flex w-full items-center md:w-2/5">
          <div className="w-full text-xl text-gray-400">
            <p>Save and preview</p>
          </div>
          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            className=" rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default EconomicDataForm
