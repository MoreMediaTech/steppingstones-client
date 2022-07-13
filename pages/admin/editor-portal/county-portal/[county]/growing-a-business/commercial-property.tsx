import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import { NEXT_URL } from '@config/index'
import { CommercialPropertySection } from '@components/CountyDistrictSections'
import Button from '@components/Button'

const CommercialProperty = ({
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
        <section className="h-screen overflow-auto bg-stone-50">
          <section className="sticky w-full bg-white shadow-lg">
            <PortalHeader
              title={`${county} County`}
              subTitle="Please Preview or Edit your content"
            />
            <section className="container mx-auto px-4 py-2">
              <div className="flex justify-between">
                <Button
                  type="button"
                  color="primary"
                  className="md:w-1/4"
                  onClick={() => {
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}/growing-a-business/`,
                      query: { ...router.query },
                    })
                  }}
                >
                  Go Back
                </Button>
              </div>
            </section>
          </section>

          <section className="container mx-auto">
            <CommercialPropertySection id={countyId} />
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

export default CommercialProperty
