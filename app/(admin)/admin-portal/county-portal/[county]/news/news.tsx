'use client'
import { Loader, UnstyledButton } from '@components/mantine-components'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

import { ContentForm } from '@components/forms'
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyNewsMutation,
} from '@global-state/features/editor/editorApiSlice'
import ContentPreview from '@components/ContentPreview'
import {Button} from '@components/ui/button'
import Header from '@components/Header'
import { Badge } from '@components/ui/badge'

import { useContentForm } from '@hooks/useContentForm'

type Props = { id: string; county: string }

export default function News({ id, county }: Props) {
  const router = useRouter()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateCountyNews, { isLoading }] =
    useUpdateOrCreateCountyNewsMutation()
  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } = useContentForm({
      data: {
        title: countyData?.news?.title as string,
        isLive: countyData?.news?.isLive as boolean,
        content: countyData?.news?.content as string,
        author: countyData?.news?.author as string,
        summary: countyData?.news?.summary as string,
        imageFile: countyData?.news?.imageUrl as string,
        id: countyData?.welcome?.id as string,
        countyId: id,
      },
      updateOrCreate: updateOrCreateCountyNews
    },refetchCounty)

  return (
    <section className=" space-y-2">
      <section className="flex items-center justify-between">
        <Header title="County News" order={1} />
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
      <section className="w-full rounded-md bg-gray-100 p-4 shadow-lg dark:bg-[#3b3c40]">
        {isLoadingCounty ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex w-full items-center justify-between">
              {countyData?.news?.isLive ? (
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
            {!isEdit && countyData?.news ? (
              <ContentPreview content={countyData?.news} />
            ) : (
              <ContentForm
                preview={preview}
                form={form}
                isLoading={isLoading}
                onSubmit={onSubmit}
                setIsEdit={setIsEdit}
                onChangePicture={onChangePicture}
              />
            )}
          </div>
        )}
      </section>
    </section>
  )
}
