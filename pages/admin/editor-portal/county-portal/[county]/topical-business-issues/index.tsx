import { useCallback, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ComponentShield } from '@components/NextShield'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'

import { AdminLayout } from 'layout'
import { EditImageProps, IContentDrawerSubNavData } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetCountyByIdQuery,
  useUpdateCountyMutation,
} from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import EditImageComponent from '@components/EditImageComponent'
import { UnstyledButton } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { setError, setPreviewSource } from 'features/upload/uploadSlice'
import { contentDrawerSubNavData } from '@components/navigation/ContentDrawer/ContentDrawerData'

const TopicalBusinessIssues = ({
  county,
  countyId,
}: {
  county: string
  countyId: string
}) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useAppDispatch()
  const { data: user } = useGetUserQuery()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
  } = useGetCountyByIdQuery(countyId, { refetchOnMountOrArgChange: true })
  const [updateCounty, { isLoading }] = useUpdateCountyMutation()
  const { previewSource, selectedFile } = useAppSelector(
    (state) => state.upload
  )
    const topicalBusinessIssuesSubPaths = contentDrawerSubNavData.filter(item => item.title === 'Topical Issues')
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditImageProps>()

  const convertFileToBase64 = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      dispatch(setPreviewSource(reader.result))
    }
    reader.onerror = () => {
      showNotification({
        message: 'Error converting file to base64',
        color: 'red',
      })
      dispatch(setError({ message: 'something went wrong!' }))
    }
  }

  const submitHandler: SubmitHandler<EditImageProps> = useCallback(
    async (data) => {
      if (data.imageFile.length > 0) {
        convertFileToBase64(data.imageFile[0] as File)
      }
      const updatedData = { id: countyId, imageFile: previewSource }

      try {
        // await updateCounty(updatedData).unwrap()
        reset()
        setIsEdit(false)
        router.replace({
          pathname: `${NEXT_URL}${router.pathname}`,
          query: { ...router.query },
        })
      } catch (error) {
        showNotification({
          message: 'Error updating county image',
          color: 'red',
        })
      }
    },
    []
  )
  return (
    <AdminLayout title={`${county} County - Editor Dashboard`}>
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <section className="h-screen overflow-auto">
          <PortalHeader
            title={`${county} County Portal`}
            subTitle="Please select district from the menu below"
            countyData={countyData}
          />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <button
                type="button"
                className="w-1/4 rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-2xl"
                onClick={() => {
                  router.replace({
                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}`,
                    query: { ...router.query },
                  })
                }}
              >
                Go Back
              </button>
            </div>
          </section>
          {isLoadingCounty && (
            <Spinner classes="w-24 h-24" message="Loading..." />
          )}
          <section className="container mx-auto w-full overflow-auto py-24 px-2 md:px-4">
            {countyData && (
              <div className="flex h-full w-full flex-col gap-8 md:flex-row">
                <div className="cols-span-1 w-full  md:w-2/5">
                  {countyData?.imageUrl !== null && !isEdit ? (
                    <div className="flex flex-col space-y-2">
                      <Image
                        src={countyData?.imageUrl}
                        alt={countyData?.name}
                        width={500}
                        height={720}
                      />
                      <UnstyledButton
                        type="button"
                        onClick={() => setIsEdit(true)}
                        className="w-full rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                        duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-2xl"
                      >
                        click to edit image
                      </UnstyledButton>
                    </div>
                  ) : (
                    <EditImageComponent
                      register={register}
                      handleSubmit={handleSubmit}
                      submitHandler={submitHandler}
                      isLoading={isLoading}
                      errors={errors}
                      setIsEdit={setIsEdit}
                    />
                  )}
                </div>
                <div className="h-full w-full md:w-3/4">
                  <div className="flex flex-col">
                    <div className="w-full space-y-4 py-8">
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                        {topicalBusinessIssuesSubPaths[0]?.subNav?.map(
                          (
                            content: Partial<IContentDrawerSubNavData>,
                            index: number
                          ) => (
                            <button
                              key={`${content.title}-${index}`}
                              type="button"
                              className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-4 px-2 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-xl"
                              onClick={() =>
                                router.replace({
                                  pathname: `${NEXT_URL}${content.path}/${county}/${content.subPath}`,
                                  query: {
                                    ...router.query,
                                    county,
                                    countyId,
                                  },
                                })
                              }
                            >
                              {content?.title}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </section>
      </ComponentShield>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token
  const { county, countyId } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {
      county: county,
      countyId: countyId,
    },
  }
}

export default TopicalBusinessIssues
