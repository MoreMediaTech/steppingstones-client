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
import useHasMounted from '@hooks/useHasMounted'

const PartnerDirectory = () => {
  const dispatch = useAppDispatch()
  const hasMounted = useHasMounted()
  const { data: user } = useGetUserQuery()
  const [isPartnerDirectoryModalOpen, setIsPartnerDirectoryModalOpen] =
    useState<boolean>(false)


  return hasMounted && (
    <AdminLayout title="Admin | Partner-Directory">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="md:h-screen overflow-auto">
          <PortalHeader
            user={user as CurrentUser}
            imgUrl={user?.imageUrl}
            title={`${user?.name}`}
            subTitle="Partner Directory"
          />
          <section className="px-2 sm:px-4 space-y-4 w-full md:max-w-screen-xl mt-2 mx-auto">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between ">
              <span className="text-lg sm:text-2xl font-bold">Partner Directory</span>
              <Button
                type="button"
                color="outline"
                className="w-50 md:w-1/4"
                onClick={() => {
                  setIsPartnerDirectoryModalOpen(true)
                  dispatch(setType('Create'))
                }}
              >
                Add Partner
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
