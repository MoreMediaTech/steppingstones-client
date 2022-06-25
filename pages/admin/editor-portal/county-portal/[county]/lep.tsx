import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'

import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import { useGetCountyByIdQuery } from 'features/editor/editorApiSlice'
import { NEXT_URL } from '@config/index'
import { LEPSection } from '@components/Sections'


const Lep = ({ county, countyId }: { county: string; countyId: string }) => {
  const router = useRouter()
  const { data: user } = useGetUserQuery()
  const { isLoading: isLoadingCounty } = useGetCountyByIdQuery(countyId, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <AdminLayout title="Editor Dashboard">
      <ComponentShield
        RBAC
        showForRole={'SS_EDITOR'}
        userRole={user?.role as string}
      >
        <section className="h-screen overflow-auto bg-stone-100">
          <section className="sticky w-full bg-white shadow-lg">
            <PortalHeader
              title={`${county} County`}
              subTitle="Please Preview or Edit your content"
            />
            {isLoadingCounty && (
              <Spinner classes="w-24 h-24" message="Loading..." />
            )}
            <section className="container mx-auto px-4 py-2">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="w-1/4 rounded-md bg-[#0c6980] px-4 py-2 font-semibold text-white drop-shadow-lg"
                  onClick={() => {
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/${county}`,
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
            <LEPSection id={countyId} />
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

export default Lep
