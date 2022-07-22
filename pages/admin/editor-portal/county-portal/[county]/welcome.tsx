import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import PortalHeader from '@components/PortalHeader'

import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import { NEXT_URL } from '@config/index'
import { WelcomeSection } from '@components/CountyDistrictSections'
import Button from '@components/Button'


const Welcome = ({
  county,
  countyId,
}: {
  county: string
  countyId: string
}) => {
  const router = useRouter()
  const { data: user } = useGetUserQuery()

  return (
    <AdminLayout title="Editor Dashboard">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="h-screen overflow-auto bg-slate-50">
          <section className="sticky w-full">
            <PortalHeader
              title={`${county}`}
              subTitle="Please Preview or Edit your content"
            />
            <section className="container mx-auto px-4 py-2">
              <div className="flex justify-between">
                <Button
                  type="button"
                  color='primary'
                  className="md:w-1/4"
                  onClick={() => {
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}`,
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
            <WelcomeSection id={countyId} />
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

export default Welcome
