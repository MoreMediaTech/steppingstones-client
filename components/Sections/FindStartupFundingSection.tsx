import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { Paper, UnstyledButton } from '@mantine/core'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/router'

import { CountySectionForm } from '@components/forms'
import { setError } from 'features/upload/uploadSlice'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateFindStartupFundingMutation,
} from 'features/editor/editorApiSlice'
import { useAppDispatch } from 'app/hooks'
import { EditorFormDataProps } from '@lib/types'
import ContentPreview from '@components/ContentPreview'
import Spinner from '@components/spinner'
import { NEXT_URL } from '@config/index'

const FindStartupFundingSection = ({ id }: { id: string }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateFindStartupFunding, { isLoading }] = useUpdateOrCreateFindStartupFundingMutation()

  const [value, setValue] = useState(countyData?.supportForStartups?.findStartupFunding?.content)
  const [isEdit, setIsEdit] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Partial<EditorFormDataProps>>({
    defaultValues: {
      title: countyData?.supportForStartups?.findStartupFunding?.title,
    },
  })
  const submitHandler: SubmitHandler<Partial<EditorFormDataProps>> =
    useCallback(async (data) => {
      try {
        const formData = {
          title: data.title,
          content: value,
          countyId: id,
          id: countyData?.supportForStartups?.id,
        }
        await updateOrCreateFindStartupFunding(formData).unwrap()
        reset()
        setIsEdit(false)
        router.replace({
          pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${countyData?.name}/support-for-startups`,
          query: { ...router.query },
        })
      } catch (error) {
        dispatch(setError({ message: error.message }))
      }
    }, [])
  return (
    <section className="relative h-auto w-full flex-grow px-2 py-2  md:py-8 md:px-8">
      <section className="container">
        {isLoadingCounty ? (
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
            {!isEdit && countyData?.supportForStartups?.findStartupFunding ? (
              <ContentPreview content={countyData?.supportForStartups?.findStartupFunding} />
            ) : (
              <CountySectionForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                isLoading={isLoading}
                submitHandler={submitHandler}
                value={value}
                setValue={setValue}
                setIsEdit={setIsEdit}
              />
            )}
          </Paper>
        )}
      </section>
    </section>
  )
}
export default FindStartupFundingSection
