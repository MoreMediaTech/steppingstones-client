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
import { useGetDistrictByIdQuery } from 'features/editor/editorApiSlice'
import { districtPages } from 'data'
import { NEXT_URL } from '@config/index'


const District = ({ district, districtId}: {district: string, districtId: string}) => {
     const router = useRouter()
     const [opened, setOpened] = useState(false)
     const { data: user } = useGetUserQuery()
     const { data: districtData, isLoading: isLoadingDistrict, isError: isErrorDistrict } = useGetDistrictByIdQuery(districtId, { refetchOnMountOrArgChange: true })
     console.log("🚀 ~ file: index.tsx ~ line 47 ~ District ~ districtData", districtData)
     
  return (
    <AdminLayout title={`${district} District - Editor Dashboard`}>
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="h-screen">
          <PortalHeader
            title={district}
            subTitle="Please select Area you want to review"
            district={district}
            districtData={districtData}
          />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <button
                type="button"
                className="w-1/4 rounded-md bg-[#0c6980] px-4 py-4 text-xl font-semibold text-white drop-shadow-lg"
                onClick={() => {
                  router.back()
                }}
              >
                Go Back
              </button>
            </div>
          </section>
          {isLoadingDistrict && (
            <Spinner classes="w-24 h-24" message="Loading..." />
          )}
          <section className="container mx-auto w-full py-24">
            {districtData && (
              <div className="flex w-full space-x-4">
                <div className="cols-span-1">
                  <Image
                    src={districtData?.imageUrl}
                    alt={districtData?.name}
                    width={500}
                    height={800}
                  />
                </div>
                <div className="cols-span-3 w-full">
                  <div className="w-full py-8">
                    <div className="grid grid-cols-2 gap-y-8 gap-x-20">
                      {districtPages.map((pages, index) => (
                        <button
                          key={`${pages.title}-${index}`}
                          type="button"
                          className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5271ff] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#0c6980] md:text-xl lg:text-2xl"
                          onClick={() =>
                            router.replace({
                              pathname: `${NEXT_URL}${pages.path}`,
                              query: { district: districtData?.name, id: districtData?.id },
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
  const { district, id } = context.query

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
      districtId: id,
    },
  }
}

export default District
