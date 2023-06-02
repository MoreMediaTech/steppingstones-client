'use client'
import { useCallback, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import {
  useCreateEconomicDataWidgetMutation,
  useUpdateEconomicDataWidgetByIdMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import { EconomicDataWidgetProps } from '@lib/types'
import EconomicDataWidget from './EconomicDataWidget'
import EconomicDataModal from './EconomicDataModal'

const EconomicDataSection = ({
  id,
  opened,
  type,
  isLoadingSection,
  economicDataWidgets,
  setOpened,
  setType,
  refetch,
}: {
  id: string
  opened: boolean
  type: 'create' | 'edit'
  isLoadingSection: boolean
  economicDataWidgets: EconomicDataWidgetProps[]
  setType: React.Dispatch<React.SetStateAction<'create' | 'edit'>>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
}) => {
  const [economicData, setEconomicData] = useState<
    EconomicDataWidgetProps | undefined
  >(undefined)

  const [createEconomicDataWidget, { isLoading: isLoadingCreate }] =
    useCreateEconomicDataWidgetMutation()

  const [updateEconomicDataWidgetById, { isLoading: isLoadingUpdate }] =
    useUpdateEconomicDataWidgetByIdMutation()

  let defaultValues = {
    title: type === 'edit' ? (economicData?.title as string) : '',
    stats: type === 'edit' ? (economicData?.stats as string) : '',
    descriptionLine1:
      type === 'edit' ? (economicData?.descriptionLine1 as string) : '',
    descriptionLine2:
      type === 'edit' ? (economicData?.descriptionLine2 as string) : '',
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
  } = useForm<EconomicDataWidgetProps>({
    defaultValues: {
      ...defaultValues,
    },
  })

  const submitHandler: SubmitHandler<EconomicDataWidgetProps> = useCallback(
    async (data) => {
      try {
        const formData = {
          ...data,
          districtSectionId: id,
          id: economicData?.id,
        }
        if (type === 'create') {
          await createEconomicDataWidget(
            formData as EconomicDataWidgetProps
          ).unwrap()
        }
        if (type === 'edit') {
          await updateEconomicDataWidgetById(
            formData as EconomicDataWidgetProps
          ).unwrap()
        }
        refetch()
        setOpened(false)
      } catch (error) {
        showNotification({
          message: 'Error updating economic data content',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    [id, economicData, type]
  )

  return (
    <>
      <section className="relative h-auto w-full flex-grow px-2 py-2  md:px-8 md:py-8">
        <section className="container">
          {isLoadingSection ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 gap-4  text-xl sm:grid-cols-2 lg:grid-cols-3">
              {economicDataWidgets?.map(
                (economicData: EconomicDataWidgetProps) => (
                  <EconomicDataWidget
                    key={economicData.id}
                    economicData={economicData}
                    setEconomicData={setEconomicData}
                    setType={setType}
                    type={type}
                    setOpened={setOpened}
                    refetch={refetch}
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
