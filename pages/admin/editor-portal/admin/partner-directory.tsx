import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { AdminLayout } from 'layout'
import { ComponentShield } from '@components/NextShield'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { CurrentUser } from '@lib/types'
import PartnerDirectorySection from '@components/PartnerDirectory'
import Button from '@components/Button'
import { useAppDispatch } from 'app/hooks'
import { setType, setPartnerData } from 'features/partner/partnerSlice'

const PartnerDirectory = () => {
  const dispatch = useAppDispatch()
  const { data: user } = useGetUserQuery()
  const [isPartnerDirectoryModalOpen, setIsPartnerDirectoryModalOpen] =
    useState<boolean>(false)
  return (
    <AdminLayout title="Meetings">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="h-screen overflow-auto">
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="Partner Directory"
          />
          <section className="px-2 sm:px-4 mx-auto space-y-4">
            <div className="flex flex-col justify-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <span className="text-2xl font-bold">Partner Directory</span>
              <Button
                type="button"
                color="primary"
                className="md:w-1/4"
                onClick={() => {
                  setIsPartnerDirectoryModalOpen(true)
                  dispatch(setType('Create'))
                }}
              >
                Add LA Section
              </Button>
            </div>
            <PartnerDirectorySection
              isPartnerDirectoryModalOpen={isPartnerDirectoryModalOpen}
              setIsPartnerDirectoryModalOpen={setIsPartnerDirectoryModalOpen}
            />
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

  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}

export default PartnerDirectory
