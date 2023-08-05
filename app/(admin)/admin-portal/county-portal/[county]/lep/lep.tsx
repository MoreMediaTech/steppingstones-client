'use client'
import { Loader, UnstyledButton } from '@components/mantine-components'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

import { ContentForm } from '@components/forms'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyLEPMutation,
} from 'app/global-state/features/editor/editorApiSlice'

import ContentPreview from 'app/components/ContentPreview'
import {Button} from '@components/ui/button'
import Header from '@components/Header'
import { Badge } from '@components/ui/badge'
import { useContentForm } from '@hooks/useContentForm'

type Props = {
  id: string
  county: string
}

export default function LEP({ id, county }: Props) {
  const router = useRouter()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateCountyLEP, { isLoading }] =
    useUpdateOrCreateCountyLEPMutation()

  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm(
      {
        data: {
          title: countyData?.lep?.title as string,
          isLive: countyData?.lep?.isLive as boolean,
          content: countyData?.lep?.content as string,
          author: countyData?.lep?.author as string,
          summary: countyData?.lep?.summary as string,
          imageFile: countyData?.lep?.imageUrl as string,
          videoUrl: countyData?.lep?.videoUrl as string,
          videoTitle: countyData?.lep?.videoTitle as string,
          videoDescription: countyData?.lep?.videoDescription as string,
          id: countyData?.lep?.id as string,
          countyId: id,
        },
        updateOrCreate: updateOrCreateCountyLEP,
      },
      refetchCounty
    )

  return (
    <section className="space-y-2 ">
      <section className="flex items-center justify-between">
        <Header title="LEP" order={1} />
        <Button
          type="button"
          className="w-1/3 md:w-1/4"
          onClick={() => {
            router.push(`/admin-portal/county-portal/${county}?countyId=${id}`)
          }}
        >
          Go Back
        </Button>
      </section>

      <section className="w-full rounded-md bg-gray-100 p-2 shadow-lg dark:bg-[#3b3c40]">
        {isLoadingCounty ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex w-full items-center justify-between">
              {countyData?.lep?.isLive ? (
                <Badge>Live</Badge>
              ) : (
                <Badge variant="destructive">Not Live</Badge>
              )}
              <UnstyledButton
                type="button"
                onClick={() => setIsEdit(!isEdit)}
                className=""
              >
                <BiEdit
                  fontSize={34}
                  className="text-gray-900 dark:text-primary-light-100"
                />
              </UnstyledButton>
            </div>
            {!isEdit && countyData?.lep ? (
              <ContentPreview content={countyData?.lep} />
            ) : (
              <ContentForm
                form={form}
                isLoading={isLoading}
                preview={preview}
                onChangePicture={onChangePicture}
                onSubmit={onSubmit}
                setIsEdit={setIsEdit}
              />
            )}
          </div>
        )}
      </section>
    </section>
  )
}
