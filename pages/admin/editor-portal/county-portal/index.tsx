import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { MdOutlineArrowRight, MdOutlineArrowLeft } from 'react-icons/md'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { CountyDataProps } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'

import { NEXT_URL } from '@config/index'
import { CreateCountyForm } from '@components/forms'
import { useGetCountiesQuery } from 'features/editor/editorApiSlice'
import Button from '@components/Button'

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


  const totalCountyButtonSlides = Math.ceil(counties?.length! / 12)

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
    if (currentPage >= totalCountyButtonSlides) {
      setCurrentPage(1)
    }
  }
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
    if (currentPage <= 1) {
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
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <Button
                type="button"
                color="outline"
                className="md:w-1/4 "
                onClick={() => {
                  router.back()
                }}
              >
                Go Back
              </Button>

              <Button
                type="button"
                color="outline"
                className="md:w-1/4 "
                onClick={() => setOpened((o) => !o)}
              >
                Add County
              </Button>
            </div>
          </section>

          <section className="flex items-center justify-center md:h-[700px] md:py-28">
            {isLoadingCounties ? (
              <div className="flex h-[700px] items-center justify-center">
                <Loader size="xl" variant="bars" />
              </div>
            ) : (
              <>
                <div className="flex h-full items-center justify-center">
                  <button
                    type="button"
                    className="h-20 bg-white/30 px-2 text-[#5E17EB] shadow-lg backdrop-blur-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    onClick={goToPreviousPage}
                  >
                    <MdOutlineArrowLeft fontSize={40} />
                  </button>
                </div>
                <div className="grid w-full max-w-screen-lg grid-cols-1 gap-8 overflow-hidden p-8 md:grid-cols-3">
                  {getPaginatedData()?.map(
                    (county: CountyDataProps, index: number) => {
                      return (
                        <Button
                          key={`${index}-${county.name}`}
                          type="button"
                          color="primary"
                          onClick={() =>
                            router.replace({
                              pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county.name}`,
                              query: {
                                county: county.name,
                                countyId: county.id,
                              },
                            })
                          }
                        >
                          <h1>{county.name}</h1>
                        </Button>
                      )
                    }
                  )}
                </div>
                <div className="flex h-full items-center justify-center">
                  <button
                    type="button"
                    className="h-20 bg-white/30 px-2 text-[#5E17EB] shadow-lg backdrop-blur-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
                    onClick={goToNextPage}
                  >
                    <MdOutlineArrowRight fontSize={44} />
                  </button>
                </div>
              </>
            )}
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
