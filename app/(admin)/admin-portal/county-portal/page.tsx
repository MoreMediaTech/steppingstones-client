'use client'
import { useState } from 'react'
import { MdOutlineArrowRight, MdOutlineArrowLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { Loader } from '@mantine/core'

import { ComponentShield } from '@components/NextShield'
import { CountyDataProps } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'

import { CreateCountyForm } from '@components/forms'
import { useGetCountiesQuery } from 'app/global-state/features/editor/editorApiSlice'
import Button from '@components/Button'

export default function CountyPortal() {
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
        <section>
          <section className="container mx-auto max-w-screen-md p-4">
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

          <section className="mx-auto flex max-w-screen-md items-center justify-center md:h-[700px] md:py-28">
            <div className="flex h-full items-center justify-center">
              <button
                type="button"
                className="h-20 bg-primary-light-50 px-2 text-primary-dark-200 shadow-lg backdrop-blur-sm transition duration-300 delay-150 ease-in-out hover:-translate-y-1 hover:scale-110"
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
                      className="!py-4"
                      onClick={() =>
                        router.push(
                          `/admin-portal/county-portal/${county.name}?countyId=${county.id}`
                        )
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
                className="h-20 bg-primary-light-50 px-2 text-primary-dark-200 shadow-lg backdrop-blur-sm transition duration-300 delay-150 ease-in-out hover:-translate-y-1 hover:scale-110 "
                onClick={goToNextPage}
              >
                <MdOutlineArrowRight fontSize={44} />
              </button>
            </div>
          </section>
        </section>
      </section>
      <CreateCountyForm
        opened={opened}
        setOpened={setOpened}
        refetch={refetchCounties}
      />
    </ComponentShield>
  )
}
