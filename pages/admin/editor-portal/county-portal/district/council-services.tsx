import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { NEXT_URL } from '@config/index'
import { CouncilServicesSection } from '@components/CountyDistrictSections'
import Button from '@components/Button'


const CouncilServices = ({
  district,
  districtId,
}: {
  district: string
  districtId: string
}) => {
  const router = useRouter()
  const { data: user } = useGetUserQuery()
  return (
    <AdminLayout title="County - Editor Dashboard">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role ?? ''}
      >
        <section className="h-screen overflow-auto bg-stone-50">
          <section className="sticky w-full bg-white drop-shadow-lg">
            <PortalHeader
              title={`${district}`}
              subTitle="Review or edit the content below"
            />
            <section className="container mx-auto bg-white px-4 py-4">
              <div className="flex justify-between">
                <Button
                  type="button"
                  color="primary"
                  className="md:w-1/4"
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
              </div>
            </section>
          </section>
          <section className="container mx-auto">
            <CouncilServicesSection id={districtId} />
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

export default CouncilServices
