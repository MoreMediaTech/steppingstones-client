'use client'
import { Loader, UnstyledButton } from '@components/mantine-components'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

// global state
import {
  useGetCountyByIdQuery,
  useUpdateOrCreateCountyWelcomeMutation,
} from 'app/global-state/features/editor/editorApiSlice'

// components
import { ContentForm } from 'app/components/forms'
import ContentPreview from 'app/components/ContentPreview'
import Header from '@components/Header'
import {Button }from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { useContentForm } from '@hooks/useContentForm'

type Props = { id: string; county: string }

export default function Welcome({ id, county }: Props) {
  const router = useRouter()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(id, { refetchOnMountOrArgChange: true })
  const [updateOrCreateCountyWelcome, { isLoading }] =
    useUpdateOrCreateCountyWelcomeMutation()

  const { form, onChangePicture, onSubmit, isEdit, setIsEdit, preview } =
    useContentForm({
      data: {
        title: countyData?.welcome?.title as string,
        isLive: countyData?.welcome?.isLive as boolean,
        content: countyData?.welcome?.content as string,
        author: countyData?.welcome?.author as string,
        summary: countyData?.welcome?.summary as string,
        imageFile: countyData?.welcome?.imageUrl as string,
        videoUrl: countyData?.welcome?.videoUrl as string,
        videoTitle: countyData?.welcome?.videoTitle as string,
        videoDescription: countyData?.welcome?.videoDescription as string,
        id: countyData?.welcome?.id as string,
        countyId: id,
      },
      updateOrCreate: updateOrCreateCountyWelcome,
    }, refetchCounty,)

  return (
    <section className="sm:container mx-auto space-y-2 py-2">
      <section className="flex items-center justify-between py-2">
        <Header title="Welcome" order={1} />
        <Button
          type="button"
          className="md:w-1/4"
          onClick={() => {
            router.push(`/admin-portal/county-portal/${county}?countyId=${id}`)
          }}
        >
          Go Back
        </Button>
      </section>
      <section className=" w-full rounded-md bg-gray-100 p-4 shadow-lg dark:bg-[#3b3c40]">
        {isLoadingCounty ? (
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <div className="w-full space-y-4 ">
            <div className="flex w-full items-center justify-between">
              {countyData?.welcome?.isLive ? (
                <Badge>Live</Badge>
              ) : (
                <Badge variant="destructive">Not Live</Badge>
              )}
              <UnstyledButton
                type="button"
                onClick={() => {
                  setIsEdit(!isEdit)
                  form.reset()
                }}
              >
                <BiEdit
                  fontSize={34}
                  className="text-gray-900 dark:text-gray-100"
                />
              </UnstyledButton>
            </div>
            {!isEdit && countyData?.welcome ? (
              <ContentPreview content={countyData?.welcome} />
            ) : (
              <ContentForm
                form={form}
                preview={preview}
                isLoading={isLoading}
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
