import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ComponentShield } from '@components/NextShield'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'
import { AdminLayout } from 'layout'
import { setError, setPreviewSource } from 'features/upload/uploadSlice'
import { EditImageProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetDistrictByIdQuery,
  useUpdateDistrictByIdMutation,
} from 'features/editor/editorApiSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { districtPages } from 'data'
import { NEXT_URL } from '@config/index'
import { UnstyledButton } from '@mantine/core'
import EditImageComponent from '@components/EditImageComponent'

const District = ({
  district,
  districtId,
}: {
  district: string
  districtId: string
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [opened, setOpened] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { data: user } = useGetUserQuery()
  const { previewSource, selectedFile } = useAppSelector(
    (state) => state.upload
  )
  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
  } = useGetDistrictByIdQuery(districtId, { refetchOnMountOrArgChange: true })

  const [updateDistrictById, { isLoading }] = useUpdateDistrictByIdMutation()

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
      try {
        const formData = {
          id: districtId,
          imageFile: previewSource,
        }
        await updateDistrictById(formData).unwrap()
        reset()
        setIsEdit(false)
        router.replace({
          pathname: `${NEXT_URL}${router.pathname}`,
          query: { ...router.query },
        })
      } catch (error) {
        dispatch(setError({ message: error.message }))
      }
    },
    [previewSource]
  )

  return (
    <AdminLayout title={`${district} District - Editor Dashboard`}>
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="h-screen">
          <PortalHeader
            title={`${district} District Council`}
            subTitle="Please select Area you want to review"
          />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <button
                type="button"
                className="w-1/4 rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-2xl"
                onClick={() => {
                  router.replace({
                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${router.query.county}`,
                    query: {
                      ...router.query,
                    },
                  })
                }}
              >
                Go Back
              </button>
            </div>
          </section>
          {isLoadingDistrict && (
            <Spinner classes="w-24 h-24" message="Loading..." />
          )}
          <section className="container mx-auto w-full py-24 px-2 md:px-4">
            {districtData && (
              <div className="flex w-full space-x-4">
                <div className="cols-span-1 w-full  md:w-2/5">
                  {districtData?.imageUrl !== null && !isEdit ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Image
                        src={districtData?.imageUrl}
                        alt={districtData?.name}
                        width={500}
                        height={800}
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
                <div className="cols-span-3 w-full">
                  <div className="w-full py-8">
                    <div className="grid grid-cols-2 gap-y-8 gap-x-20">
                      {districtPages.map((pages, index) => (
                        <button
                          key={`${pages.title}-${index}`}
                          type="button"
                          className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-2xl"
                          onClick={() =>
                            router.replace({
                              pathname: `${NEXT_URL}${pages.path}`,
                              query: {
                                county: router.query.county,
                                countyId: router.query.countyId,
                                district: districtData?.name,
                                districtId: districtData?.id,
                              },
                            })
                          }
                        >
                          {pages.title}
                        </button>
                      ))}
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
  const { district, countyId, county, districtId } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  // const user = await getUser(cookies)
  // const userRoles = ['SS_EDITOR', "COUNTY_EDITOR"]

  // if (!user?.isAdmin ) {
  //   return {
  //     redirect: {
  //       destination: '/not-authorized',
  //       permanent: false,
  //     },
  //   }
  // }
  // if (!userRoles.includes(user.role)) {
  //   return {
  //     redirect: {
  //       destination: '/admin',
  //       permanent: false,
  //     },
  //   }
  // }
  return {
    // props: { user: user as SessionProps },
    props: {
      district: district,
      districtId: districtId,
      county: county,
      countyId: countyId,
    },
  }
}

export default District
