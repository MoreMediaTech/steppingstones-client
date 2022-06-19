import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ComponentShield } from '@components/NextShield'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'

import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import { useGetCountyByIdQuery } from 'features/editor/editorApiSlice'
import FileUploadForm from '@components/forms/FileUploadForm'
import { AddDistrictForm } from '@components/forms'
import { NEXT_URL } from '@config/index'

type DistrictProps = {
  id: string
  name: string
}

const County = ({ county, countyId }: { county: string; countyId: string }) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const { data: user } = useGetUserQuery()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
  } = useGetCountyByIdQuery(countyId, { refetchOnMountOrArgChange: true })
  // console.log(
  //   '🚀 ~ file: [county].tsx ~ line 20 ~ County ~ countyData',
  //   countyData
  // )

  return (
    <AdminLayout title={`${county} County - Editor Dashboard`}>
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <section className="h-screen">
          <PortalHeader user={user as CurrentUser} />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <button
                type="button"
                className="w-1/4 rounded-md bg-[#0c6980] px-4 py-2 font-semibold text-white drop-shadow-lg"
                onClick={() => {
                  router.back()
                }}
              >
                Go Back
              </button>

              <button
                type="button"
                className="w-1/4 rounded-md bg-[#0c6980] px-4 py-4 font-semibold text-white shadow-2xl transition delay-150 duration-300 
              ease-in-out hover:-translate-y-1 hover:scale-y-100 hover:bg-[#0c5280f9]"
                onClick={() => setOpened((o) => !o)}
              >
                Add District
              </button>
            </div>
          </section>
          {isLoadingCounty && (
            <Spinner classes="w-24 h-24" message="Loading..." />
          )}
          <section className="container mx-auto w-full py-24">
            {countyData && (
              <div className="flex w-full space-x-4">
                <div className="cols-span-1">
                  <Image
                    src={countyData?.imageUrl}
                    alt={countyData?.name}
                    width={500}
                    height={800}
                  />
                </div>
                <div className="cols-span-3 w-full">
                  <div className="flex w-full items-center justify-between space-x-6">
                    <button
                      type="button"
                      className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#314ecd] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#25525e] md:text-xl lg:text-2xl"
                    >
                      Welcome
                    </button>
                    <button
                      type="button"
                      className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#314ecd] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#25525e] md:text-xl lg:text-2xl"
                    >
                      LEP
                    </button>
                    <button
                      type="button"
                      className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#314ecd] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#25525e] md:text-xl lg:text-2xl"
                    >
                      NEWS
                    </button>
                  </div>
                  <div className="w-full py-8">
                    <div className="grid grid-cols-2 gap-y-8 gap-x-20">
                      {countyData?.districts.map((district: DistrictProps) => (
                        <button
                          key={district.id}
                          type="button"
                          className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5271ff] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#0c6980] md:text-xl lg:text-2xl"
                          onClick={() =>
                            router.replace({
                              pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district`,
                              query: { district: district.name, id: district.id },
                            })
                          }
                        >
                          {district?.name}
                        </button>
                      ))}
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
  const { county, id } = context.query

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
      county: county,
      countyId: id,
    },
  }
}

export default County
