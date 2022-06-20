import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import PortalHeader from '@components/PortalHeader'
import WhyInvestSection from '@components/WhyInvestSection'
import { NEXT_URL } from '@config/index'

const District = ({ district, id }: { district: string; id: string }) => {
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
              title={district}
              subTitle="Please select Area you want to review"
              district={district}
              districtData={{ id, name: district, imageUrl: '' }}
            />
            <section className="container mx-auto bg-white px-4 py-4">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="rounded-md bg-[#0c6980] px-2 py-2 text-xl font-semibold text-white shadow-xl 
                  drop-shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#2796b2] md:px-4 md:py-2 md:text-xl lg:text-2xl "
                  onClick={() =>
                    router.replace({
                      pathname: `${NEXT_URL}/admin/editor-portal/county-portal/district`,
                      query: {
                        district: district,
                        id: id,
                      },
                    })
                  }
                >
                  Go Back
                </button>
              </div>
            </section>
          </section>
          <WhyInvestSection id={id} />
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
  const { district, id } = context.query
  console.log('🚀 ~ file: why-invest-in.tsx ~ line 55 ~ district', district)

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {
      district: district as string,
      id: id as string,
    },
  }
}

export default District
