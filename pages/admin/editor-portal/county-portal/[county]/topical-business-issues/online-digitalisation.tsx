import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { NEXT_URL } from '@config/index'
import { OnlineDigitalisationSection } from '@components/Sections'

const OnlineDigitalisation = ({
  county,
  countyId,
}: {
  county: string
  countyId: string
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
          <section className="sticky w-full bg-white shadow-lg">
            <PortalHeader
              title={`${county} County`}
              subTitle="Please Preview or Edit your content"
            />
            <section className="container mx-auto px-4 py-2">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="w-1/4 rounded-md bg-[#0c6980] px-4 py-2 font-semibold text-white drop-shadow-lg"
                  onClick={() => {
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/topical-business-issues/`,
                      query: { ...router.query },
                    })
                  }}
                >
                  Go Back
                </button>
              </div>
            </section>
          </section>

          <section className="container mx-auto">
            <OnlineDigitalisationSection id={countyId} />
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
  const { county, countyId } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {
      county: county,
      countyId: countyId,
    },
  }
}

export default OnlineDigitalisation
