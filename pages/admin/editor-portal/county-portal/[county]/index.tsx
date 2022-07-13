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
import { AddDistrictForm } from '@components/forms'
import { NEXT_URL } from '@config/index'
import { useAppDispatch } from 'app/hooks'
import EditImageComponent from '@components/EditImageComponent'
import { UnstyledButton } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { setError } from 'features/upload/uploadSlice'
import { contentDrawerSubNavData } from '@components/navigation/ContentDrawer/ContentDrawerData'
import Button from '@components/Button'

type DistrictProps = {
  id: string
  name: string
}

const County = ({ county, countyId }: { county: string; countyId: string }) => {
  const router = useRouter()
  const [opened, setOpened] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    null
  )
  const dispatch = useAppDispatch()
  const { data: user } = useGetUserQuery()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
    refetch: refetchCounty,
  } = useGetCountyByIdQuery(countyId, { refetchOnMountOrArgChange: true })

  const [updateCounty, { isLoading }] = useUpdateCountyMutation()
  

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
      setPreview(reader.result)
    }
    reader.onerror = () => {
      showNotification({
        message: 'Error converting file to base64',
        color: 'red',
      })
      dispatch(setError({ message: 'something went wrong!' }))
    }
  }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const file = e.target.files?.[0]
      if (file) {
        convertFileToBase64(file)
      }
    }

  const submitHandler: SubmitHandler<EditImageProps> = async (data) => {
    const updatedData = { id: countyId, imageFile: preview }

    try {
      await updateCounty(updatedData).unwrap()
      refetchCounty()
      setIsEdit(false)
      setPreview(null)
    } catch (error) {
      showNotification({
        message: 'Error updating county image',
        autoClose: 3000,
        color: 'red',
      })
    }
  }

  return (
    <AdminLayout title={`${countyData?.name} County - Editor Dashboard`}>
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <section className="h-screen overflow-auto">
          <PortalHeader
            title={`${countyData?.name} County Portal`}
            subTitle="Please select district from the menu below"
            data={countyData}
          />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <Button
                type="button"
                color="primary"
                className=" md:w-1/4 "
                onClick={() => {
                  router.replace({
                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal`,
                  })
                }}
              >
                Go Back
              </Button>

              <Button
                type="button"
                color='primary'
                className="md:w-1/4 "
                onClick={() => setOpened((o) => !o)}
              >
                Add District
              </Button>
            </div>
          </section>
          {isLoadingCounty && (
            <Spinner classes="w-24 h-24" message="Loading..." />
          )}
          <section className="container mx-auto w-full overflow-auto py-24 px-2 md:px-4">
            {countyData && (
              <div className="flex h-full w-full flex-col gap-8 md:flex-row">
                <div className="cols-span-1 w-full  md:w-2/5 space-y-2">
                  {countyData?.imageUrl !== null && !isEdit ? (
                    <>
                    <div className="relative flex flex-col space-y-2 w-full h-[650px] ">
                      <Image
                        src={countyData?.imageUrl}
                        alt={countyData?.name}
                        objectFit="contain"
                        layout="fill"
                      />
                    </div>
                      <UnstyledButton
                        type="button"
                        onClick={() => setIsEdit(true)}
                        className="w-full rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                        duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl"
                      >
                        click to edit image
                      </UnstyledButton>
                    </>
                  ) : (
                    <EditImageComponent
                      register={register}
                      handleSubmit={handleSubmit}
                      submitHandler={submitHandler}
                      isLoading={isLoading}
                      errors={errors}
                      setIsEdit={setIsEdit}
                      preview={preview}
                      setPreview={setPreview}
                      handleChange={handleChange}
                    />
                  )}
                </div>
                <div className="h-full w-full md:w-3/4">
                  <div className="flex flex-col">
                    <div className="flex w-full items-center justify-between space-x-6">
                      <button
                        type="button"
                        className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-4 px-4 text-lg font-semibold text-white shadow-xl 
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:py-6 md:text-xl "
                        onClick={() => {
                          router.replace({
                            pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/welcome`,
                            query: { county, countyId },
                          })
                        }}
                      >
                        Welcome
                      </button>
                      <button
                        type="button"
                        className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-4 px-4 text-lg font-semibold text-white drop-shadow-lg 
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:py-6 md:text-xl "
                        onClick={() => {
                          router.replace({
                            pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/lep`,
                            query: { county, countyId },
                          })
                        }}
                      >
                        LEP
                      </button>
                      <button
                        type="button"
                        className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-4 px-4 text-lg font-semibold text-white drop-shadow-lg 
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:py-6 md:text-xl "
                        onClick={() => {
                          router.replace({
                            pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/news`,
                            query: { county, countyId },
                          })
                        }}
                      >
                        NEWS
                      </button>
                    </div>
                    <div className="w-full space-y-4 py-8">
                      <div className="grid grid-cols-2 gap-y-4 gap-x-10 md:gap-x-20">
                        {countyData?.districts?.map(
                          (district: DistrictProps) => (
                            <button
                              key={district?.id}
                              type="button"
                              className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl "
                              onClick={() =>
                                router.replace({
                                  pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district`,
                                  query: {
                                    ...router.query,
                                    district: district?.name,
                                    districtId: district?.id,
                                  },
                                })
                              }
                            >
                              {district?.name}
                            </button>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-y-4 gap-x-4">
                        {contentDrawerSubNavData?.map(
                          (
                            content: IContentDrawerSubNavData,
                            index: number
                          ) => (
                            <button
                              key={`${content?.title}-${index}`}
                              type="button"
                              className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-2 px-2 text-lg font-semibold text-white shadow-lg 
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:py-6 "
                              onClick={() =>
                                router.replace({
                                  pathname: `${NEXT_URL}${content?.path2}/${county}/${content?.subPath2}`,
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
        <AddDistrictForm
          opened={opened}
          setOpened={setOpened}
          countyId={countyId}
          county={countyData?.name}
          refetch={refetchCounty}
        />
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

export default County
