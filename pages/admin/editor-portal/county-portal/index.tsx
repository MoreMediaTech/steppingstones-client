import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { MdOutlineArrowRight, MdOutlineArrowLeft } from 'react-icons/md'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { CountyDataProps, CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'

import { NEXT_URL } from '@config/index'
import { CreateCountyForm } from '@components/forms'
import { useGetCountiesQuery } from 'features/editor/editorApiSlice'
import { skipToken, SkipToken } from '@reduxjs/toolkit/dist/query'

type CountyProps = {
  id: string
  name: string
  authorId: string
  published: boolean
  viewCount: number
}

const County = () => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { data: user } = useGetUserQuery()
  const {
    data: counties,
    isLoading: isLoadingCounties,
    isError: isErrorCounties,
    refetch: refetchCounties,
  } = useGetCountiesQuery()
    // console.log("🚀 ~ file: index.tsx ~ line 35 ~ County ~ counties", counties)

  const totalCountyButtonSlides = Math.ceil(counties?.length! / 12)

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
    if(currentPage >= totalCountyButtonSlides) {
      setCurrentPage(1)
    }
  }
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
    if(currentPage <= 1){
      setCurrentPage(totalCountyButtonSlides)
    }
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * 12 - 12
    const endIndex = startIndex + 12
    return counties?.slice(startIndex, endIndex)
  }

  return (
    <AdminLayout title="Editor Dashboard">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="h-screen">
          <PortalHeader
            title="UK Counties"
            subTitle="Please select from the menu below"
          />
          {isLoadingCounties && (
            <Spinner classes="w-24 h-24" message="Loading..." />
          )}
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <button
                type="button"
                className="w-1/4 rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-2xl"
                onClick={() => {
                  router.back()
                }}
              >
                Go Back
              </button>

              <button
                type="button"
                className="w-1/4 rounded-md bg-[#5E17EB] px-4 py-4 font-semibold text-white shadow-2xl transition delay-150 duration-300 
              ease-in-out hover:-translate-y-1 hover:scale-y-100 hover:bg-[#3A0B99] md:text-xl lg:text-2xl"
                onClick={() => setOpened((o) => !o)}
              >
                Add County
              </button>
            </div>
          </section>

          <section className="flex items-center justify-center md:h-[700px] md:py-28">
            <button
              type="button"
              className="h-full bg-white/30 px-2 text-[#5E17EB] drop-shadow-lg backdrop-blur-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              onClick={goToPreviousPage}
            >
              <MdOutlineArrowLeft fontSize={40} />
            </button>
            <div className="grid w-full max-w-screen-lg grid-cols-1 gap-8 overflow-hidden p-8 md:grid-cols-3">
              {getPaginatedData()?.map(
                (county: CountyDataProps, index: number) => {
                  return (
                    <div
                      key={`${index}-${county.name}`}
                      className="flex w-full  cursor-pointer items-center justify-center rounded-xl bg-[#5E17EB] py-6 px-4 text-lg font-semibold text-white 
                    drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-xl lg:text-2xl"
                      onClick={() =>
                        router.replace({
                          pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county.name}`,
                          query: { county: county.name, countyId: county.id },
                        })
                      }
                    >
                      <h1>{county.name}</h1>
                    </div>
                  )
                }
              )}
            </div>
            <div className="h-full">
              <button
                type="button"
                className="h-full bg-white/30 px-2 text-[#5E17EB] drop-shadow-lg backdrop-blur-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
                onClick={goToNextPage}
              >
                <MdOutlineArrowRight fontSize={44} />
              </button>
            </div>
          </section>
        </section>
        <CreateCountyForm
          opened={opened}
          setOpened={setOpened}
          refetch={refetchCounties}
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

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}

export default County
