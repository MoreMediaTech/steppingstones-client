import { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { NEXT_URL } from '@config/index'
import { EconomicDataSection } from '@components/CountyDistrictSections'
import Button from '@components/Button'

const EconomicData = ({
  district,
  districtId,
}: {
  district: string
  districtId: string
}) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const [type, setType] = useState<'create' | 'edit'>('create')
  const { data: user } = useGetUserQuery()
  return (
    <AdminLayout title="County - Editor Dashboard">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <section className="h-screen overflow-auto bg-stone-50">
          <PortalHeader
            title={`${district}`}
            subTitle="Please Preview or Edit your content"
          />
          <section className="container mx-auto px-4 py-4">
            <div className="flex justify-between">
              <Button
                type="button"
                color="primary"
                className="md:w-1/4 "
                onClick={() =>
                  router.replace({
                    pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district`,
                    query: {
                      ...router.query,
                    },
                  })
                }
              >
                Go Back
              </Button>
              <Button
                type="button"
                color="primary"
                className="md:w-1/4 "
                onClick={() => {
                  setOpened(true)
                  setType('create')
                }}
              >
                Add Economic Data
              </Button>
            </div>
          </section>
          <section className="container mx-auto">
            <EconomicDataSection
              id={districtId}
              opened={opened}
              setOpened={setOpened}
              type={type}
              setType={setType}
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
  const { district, districtId } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    props: {
      district: district as string,
      districtId: districtId,
    },
  }
}

export default EconomicData
