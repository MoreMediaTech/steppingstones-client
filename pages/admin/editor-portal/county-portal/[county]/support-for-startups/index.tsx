import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ComponentShield } from '@components/NextShield'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'

import { AdminLayout } from 'layout'
import { IContentDrawerSubNavData } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import { useGetCountyByIdQuery } from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import { contentDrawerSubNavData } from '@components/navigation/ContentDrawer/ContentDrawerData'

const SupportForBusiness = ({
  county,
  countyId,
}: {
  county: string
  countyId: string
}) => {
  const router = useRouter()
  const { data: user } = useGetUserQuery()
  const {
    data: countyData,
    isLoading: isLoadingCounty,
    isError: isErrorCounty,
  } = useGetCountyByIdQuery(countyId, { refetchOnMountOrArgChange: true })

  const supportForStartupsSubPaths = contentDrawerSubNavData.filter(
    (item) => item.title === 'Support for Startups'
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
            subTitle="Please select from the menu below"
            data={countyData}
          />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <button
                type="button"
                className="rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 duration-300 
                ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:w-1/4 md:text-xl lg:text-2xl"
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
                  {countyData?.imageUrl !== null && (
                    <div className="flex flex-col space-y-2">
                      <Image
                        src={countyData?.imageUrl}
                        alt={countyData?.name}
                        width={500}
                        height={720}
                      />
                    </div>
                  )}
                </div>
                <div className="h-full w-full md:w-3/4">
                  <div className="flex flex-col">
                    <div className="w-full space-y-4 py-8">
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                        {supportForStartupsSubPaths[0]?.subNav?.map(
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

export default SupportForBusiness
