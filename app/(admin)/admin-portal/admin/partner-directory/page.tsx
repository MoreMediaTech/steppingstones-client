'use client'
import { useState } from 'react'
import { Box } from '@mantine/core'

import { ComponentShield } from 'app/components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'
import PartnerDirectorySection from 'app/components/PartnerDirectory'
import Button from 'app/components/Button'
import { useAppDispatch } from 'app/global-state/hooks'
import { setType } from 'app/global-state/features/partner/partnerSlice'
import Header from 'app/components/Header'

export default function PartnerDirectory() {
  const dispatch = useAppDispatch()

  const { data: user } = useGetUserQuery()
  const [isPartnerDirectoryModalOpen, setIsPartnerDirectoryModalOpen] =
    useState<boolean>(false)

  return (
    <ComponentShield
      RBAC
      showForRole={'SS_EDITOR'}
      userRole={user?.role as string}
    >
      <section className="overflow-auto md:h-screen">
        <PortalHeader
          user={user as CurrentUser}
          imgUrl={user?.imageUrl}
          title={`${user?.name}`}
          subTitle="Partner Directory"
        />
        <section className="mx-auto mt-2 w-full space-y-4 px-2 sm:px-4 md:max-w-screen-xl">
          <Box
            sx={{
              marginTop: '1rem',
              marginLeft: '1rem',
              marginRight: '1rem',
              height: '100%',
            }}
          >
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between ">
              <Header title="Partner Directory" order={2} />
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
          </Box>
          <PartnerDirectorySection
            isPartnerDirectoryModalOpen={isPartnerDirectoryModalOpen}
            setIsPartnerDirectoryModalOpen={setIsPartnerDirectoryModalOpen}
          />
        </section>
      </section>
    </ComponentShield>
  )
}
