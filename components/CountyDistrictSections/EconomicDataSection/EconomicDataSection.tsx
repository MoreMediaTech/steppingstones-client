import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import {
  useGetDistrictByIdQuery,
  useCreateEconomicDataWidgetMutation,
  useUpdateEconomicDataWidgetByIdMutation,
} from 'features/editor/editorApiSlice'
import { EconomicDataWidgetProps } from '@lib/types'
import EconomicDataWidget from './EconomicDataWidget'
import EconomicDataModal from './EconomicDataModal'

const EconomicDataSection = ({
  id,
  opened,
  setOpened,
  type,
  setType,
}: {
  id: string
  opened: boolean
  type: 'create' | 'edit'
  setType: React.Dispatch<React.SetStateAction<'create' | 'edit'>>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [economicData, setEconomicData] = useState<
    EconomicDataWidgetProps | undefined
  >(undefined)

  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
    refetch: refetchDistrict,
  } = useGetDistrictByIdQuery(id, { refetchOnMountOrArgChange: true })

  const [createEconomicDataWidget, { isLoading: isLoadingCreate }] =
    useCreateEconomicDataWidgetMutation()

  const [updateEconomicDataWidgetById, { isLoading: isLoadingUpdate }] =
    useUpdateEconomicDataWidgetByIdMutation()

  let defaultValues = {
    title: type === 'edit' ? (economicData?.title as string) : '',
    stats: type === 'edit' ? (economicData?.stats as string) : '',
    descriptionLine1: type === 'edit' ? (economicData?.descriptionLine1 as string) : '',
    descriptionLine2: type === 'edit' ? (economicData?.descriptionLine2 as string) : '',
    linkName: type === 'edit' ? (economicData?.linkName as string) : '',
    linkUrl: type === 'edit' ? (economicData?.linkUrl as string) : '',
  }

  useEffect(() => {
    reset({ ...defaultValues })
  }, [type, opened])

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<EconomicDataWidgetProps>>({
    defaultValues: {
      ...defaultValues,
    },
  })

  const submitHandler: SubmitHandler<Partial<EconomicDataWidgetProps>> =
    useCallback(
      async (data) => {
        try {
          const formData = {
            ...data,
            economicDataId: districtData?.economicData?.id,
            id: economicData?.id,
          }
          if (type === 'create') {
            await createEconomicDataWidget(formData).unwrap()
          }
          if (type === 'edit') {
            await updateEconomicDataWidgetById(formData).unwrap()
          }
          refetchDistrict()
          setOpened(false)
        } catch (error) {
          showNotification({
            message: 'Error updating economic data content',
            autoClose: 3000,
            color: 'red',
          })
        }
      },
      [districtData?.economicData, economicData, type]
    )

  return (
    <>
      <section className="relative h-auto w-full flex-grow px-2 py-2  md:py-8 md:px-8">
        <section className="container">
          {isLoadingDistrict ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <div className="grid w-full  grid-cols-3 gap-4 text-xl">
              {districtData?.economicData?.economicDataWidgets?.map(
                (economicData: EconomicDataWidgetProps) => (
                  <EconomicDataWidget
                    key={economicData.id}
                    economicData={economicData}
                    setEconomicData={setEconomicData}
                    setType={setType}
                    type={type}
                    setOpened={setOpened}
                    refetch={refetchDistrict}
                  />
                )
              )}
            </div>
          )}
        </section>
      </section>
      <EconomicDataModal
        title="Create Economic Data Widget"
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        opened={opened}
        setOpened={setOpened}
        isLoading={type === 'edit' ? isLoadingUpdate : isLoadingCreate}
        register={register}
      />
    </>
  )
}

export default EconomicDataSection
