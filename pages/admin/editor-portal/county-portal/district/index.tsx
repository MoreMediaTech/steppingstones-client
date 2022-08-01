import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { UnstyledButton, Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'
import { AdminLayout } from 'layout'
import { setError } from 'features/upload/uploadSlice'
import { DistrictSectionProps, EditImageProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import {
  useGetDistrictByIdQuery,
  useUpdateDistrictByIdMutation,
  useCreateDistrictSectionMutation,
} from 'features/editor/editorApiSlice'
import { useAppDispatch } from 'app/hooks'
import { NEXT_URL } from '@config/index'
import EditImageComponent from '@components/EditImageComponent'
import Button from '@components/Button'
import { CreateLASectionForm } from '@components/forms'

const District = ({
  district,
  districtId,
}: {
  district: string
  districtId: string
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [opened, setOpened] = useState<boolean>(false)
    const [openAddLASectionModal, setAddOpenLASectionModal] =
      useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const { data: user } = useGetUserQuery()

  const {
    data: districtData,
    isLoading: isLoadingDistrict,
    isError: isErrorDistrict,
    refetch: refetchDistrict,
  } = useGetDistrictByIdQuery(districtId, { refetchOnMountOrArgChange: true })


  const [updateDistrictById, { isLoading }] = useUpdateDistrictByIdMutation()
  const [createDistrictSection, { isLoading: isLoadingCreateLASection }] = useCreateDistrictSectionMutation()

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

  const submitHandler: SubmitHandler<EditImageProps> = useCallback(
    async (data) => {
      try {
        const formData = {
          id: districtId,
          imageFile: preview,
        }
        await updateDistrictById(formData).unwrap()
        refetchDistrict()
        setIsEdit(false)
        setPreview(null)
      } catch (error) {
        dispatch(setError({ message: error.message }))
        showNotification({
          message: 'Something went wrong! Unable to upload Image',
          autoClose: 3000,
          color: 'red',
        })
      }
    },
    [preview]
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
            title={`${district}`}
            subTitle="Please select Area you want to review"
          />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <Button
                type="button"
                color="primary"
                className="md:w-1/4"
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
              </Button>
              <Button
                type="button"
                color="primary"
                className="md:w-1/4"
                onClick={() => setAddOpenLASectionModal((o) => !o)}
              >
                Add LA Section
              </Button>
            </div>
          </section>
          {isLoadingDistrict ? (
            <div className="flex h-[700px] items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
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
                        preview={preview}
                        setPreview={setPreview}
                        handleChange={handleChange}
                      />
                    )}
                  </div>
                  <div className="cols-span-3 w-full">
                    <div className="w-full py-8">
                      <div className="grid grid-cols-2 gap-y-8 gap-x-20">
                        {districtData?.districtSections?.map(
                          (section: DistrictSectionProps) => (
                            <button
                              key={`${section.id}`}
                              type="button"
                              className={`flex w-full
                             cursor-pointer items-center  justify-center rounded-xl bg-[#5E17EB] py-2 px-2 text-lg font-semibold text-white shadow-lg transition 
                    delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99]  md:py-6 `}
                              onClick={() =>
                                router.push({
                                  pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district/${section.id}`,
                                  query: {
                                    county: router.query.county,
                                    countyId: router.query.countyId,
                                    district: districtData?.name,
                                    districtId: districtData?.id,
                                  },
                                })
                              }
                            >
                              {section.name}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}
        </section>
        <CreateLASectionForm
          opened={openAddLASectionModal}
          setOpened={setAddOpenLASectionModal}
          isLoading={isLoadingCreateLASection}
          createSection={createDistrictSection}
          refetch={refetchDistrict}
          id={districtData?.id}
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
  const { district, countyId, county, districtId } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

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
