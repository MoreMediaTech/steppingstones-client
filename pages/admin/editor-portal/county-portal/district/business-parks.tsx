import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { NEXT_URL } from '@config/index'
import { BusinessParksSection } from '@components/Sections'


const BusinessParks = ({
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
        <section className="h-screen overflow-auto bg-stone-100">
          <section className="sticky w-full bg-white drop-shadow-lg">
            <PortalHeader
              title={`${district} District Council`}
              subTitle="Please select Area you want to review"
            />
            <section className="container mx-auto bg-white px-4 py-4">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="rounded-md bg-[#0c6980] px-2 py-2 text-xl font-semibold text-white shadow-xl 
                  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#2796b2] md:px-4 md:py-2 md:text-xl lg:text-2xl "
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
                </button>
              </div>
            </section>
          </section>
          <section className="container mx-auto">
            <BusinessParksSection id={districtId} />
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

export default BusinessParks
