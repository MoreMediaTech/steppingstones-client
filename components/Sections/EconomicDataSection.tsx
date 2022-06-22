import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'

import { setError } from 'features/upload/uploadSlice'
import {
  useCreateDistrictWhyInvestMutation,
  useGetDistrictByIdQuery,
} from 'features/editor/editorApiSlice'
import { useAppDispatch } from 'app/hooks'
import { EconomicDataProps } from '@lib/types'
import ContentPreview from '@components/ContentPreview'
import Spinner from '@components/spinner'
import EconomicDataForm from '@components/forms/EconomicDataForm'

const EconomicDataSection = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
  } = useGetDistrictByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [createDistrictWhyInvest, { isLoading }] = useCreateDistrictWhyInvestMutation()
  const [isEdit, setIsEdit] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EconomicDataProps>({
    defaultValues: {
      workingAgePopulation: districtData?.economicData?.workingAgePopulation,
      labourDemand: districtData?.economicData?.labourDemand,
      noOfRetailShops: districtData?.economicData?.noOfRetailShops,
      employmentInvestmentLand:
        districtData?.economicData?.employmentInvestmentLand,
      unemploymentRate: districtData?.economicData?.imageUrl,
      numOfRegisteredCompanies:
        districtData?.economicData?.numOfRegisteredCompanies,
      numOfBusinessParks: districtData?.economicData?.numOfBusinessParks,
      averageHousingCost: districtData?.economicData?.imageUrl,
      averageWageEarnings: districtData?.economicData?.averageWageEarnings,
    },
  })

  const submitHandler: SubmitHandler<EconomicDataProps> = useCallback(
    async (data) => {
      try {
        const formData = {
          ...data,
          districtId: id,
        }
        await createDistrictWhyInvest(formData).unwrap()
        reset()
      } catch (error) {
        dispatch(setError({ message: error.message }))
      }
    },
    []
  )
  return (
    <section className="relative h-auto w-full flex-grow px-2 py-2  md:py-8 md:px-8">
      <section className="container">
        {isLoadingDistrict ? (
          <Spinner classes="w-24 h-24" message="Loading..." />
        ) : (
          <Paper shadow="lg" p="md" radius="md" withBorder className="w-full">
            <div className="flex w-full justify-end">
              <UnstyledButton
                type="button"
                onClick={() => setIsEdit(!isEdit)}
                className=""
              >
                <BiEdit fontSize={44} />
              </UnstyledButton>
            </div>
            {!isEdit && districtData?.economicData ? (
              <ContentPreview content={districtData?.economicData} />
            ) : (
              <EconomicDataForm
                register={register}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                submitHandler={submitHandler}
                setIsEdit={setIsEdit}
              />
            )}
          </Paper>
        )}
      </section>
    </section>
  )
}

export default EconomicDataSection
