'use client'
import { useRouter } from 'next/navigation'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'

import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { WelcomeSection } from '@components/CountyDistrictSections'
import Button from '@components/Button'

export default function Welcome({
  searchParams,
}: {
  searchParams: { county: string; countyId: string }
}) {
  const router = useRouter()
  const { data: user } = useGetUserQuery()

  return (
    <ComponentShield
      RBAC
      showForRole={'SS_EDITOR'}
      userRole={user?.role as string}
    >
      <section className="h-screen overflow-auto ">
        <section className="sticky w-full">
          <PortalHeader
            title={`${searchParams.county}`}
            subTitle="Please Preview or Edit your content"
          />
          <section className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              <Button
                type="button"
                color="outline"
                className="md:w-1/4"
                onClick={() => {
                  router.push(
                    `/admin-portal/county-portal/${searchParams.county}?countyId=${searchParams.countyId}`
                  )
                }}
              >
                Go Back
              </Button>
            </div>
          </section>
        </section>

        <section className="container mx-auto">
          <WelcomeSection id={searchParams.countyId} />
        </section>
      </section>
    </ComponentShield>
  )
}
