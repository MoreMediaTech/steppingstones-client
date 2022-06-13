import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { MdOutlineArrowRight, MdOutlineArrowLeft } from 'react-icons/md'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'
import { counties } from 'data'
import { NEXT_URL } from '@config/index'

const County = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const totalCountyButtonSlides = Math.ceil(counties.length / 12)
  console.log(
    '🚀 ~ file: counties.tsx ~ line 14 ~ county ~ totalCountyButtons',
    totalCountyButtonSlides
  )
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
    return counties.sort().slice(startIndex, endIndex)
  }

  return (
    <AdminLayout title="Editor Dashboard">
      {isLoading && <Spinner classes="w-24 h-24" message="Loading..." />}
      {isError && (
        <div className="flex h-full items-center justify-center">
          An Error has occurred
        </div>
      )}
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <section className="h-screen">
          <PortalHeader title="Uk Counties" subTitle='Please select from the menu eblow' />
          <section className="flex items-center justify-center md:h-[700px] md:py-28">
            <button
              type="button"
              className="h-full bg-white/30 px-2 text-[#0c6980] backdrop-blur-sm drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              onClick={goToPreviousPage}
            >
              <MdOutlineArrowLeft fontSize={40} />
            </button>
            <div className="grid w-full max-w-screen-lg grid-cols-1 gap-8 overflow-hidden p-8 md:grid-cols-3">
              {getPaginatedData().map((county: string, index) => {
                return (
                  <div
                    key={`${index}-${county}`}
                    className="md:w-54 flex h-24 items-center justify-center rounded-xl bg-[#5271ff] py-6 px-4 text-2xl font-semibold text-white drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#0c6980] "
                    onClick={() => router.replace(`${NEXT_URL}/admin/editor-portal/counties/${county}`)}
                  >
                    <h1>{county}</h1>
                  </div>
                )
              })}
            </div>
            <div className="h-full">
              <button
                type="button"
                className="h-full bg-white/30 px-2 text-[#0c6980] backdrop-blur-sm drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
                onClick={goToNextPage}
              >
                <MdOutlineArrowRight fontSize={44} />
              </button>
            </div>
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
    props: {},
  }
}

export default County
