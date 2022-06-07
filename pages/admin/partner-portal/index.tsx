import { useState, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { SessionProps } from '@lib/types'
import { ComponentShield } from '@components/NextShield'
import { PartnerPortalLayout } from 'layout'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'
import { wrapper } from 'app/store'

const index = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    mounted && (
      <PartnerPortalLayout title="Partner Portal">
        {isLoading && <Spinner classes="w-24 h-24" message="Loading..." />}
        {isError && (
          <div className="flex items-center justify-center">
            An Error has occurred
          </div>
        )}
        <ComponentShield
          RBAC
          showForRole="PARTNER"
          userRole={user?.role as string}
        >
          <section className="container mx-auto">
            <div className="text-center">
              <h1>
                Welcome <span className="uppercase">{user?.name}</span> to the
                Partner Portal
              </h1>
            </div>
          </section>
        </ComponentShield>
      </PartnerPortalLayout>
    )
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token
  console.log('store', store.getState().auth)
  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  // const user = await getUser(cookies)
  // if (!user?.isAdmin) {
  //   return {
  //     redirect: {
  //       destination: '/not-authorized',
  //       permanent: false,
  //     },
  //   }
  // }
  // if (user?.role !== 'PARTNER') {
  //   return {
  //     redirect: {
  //       destination: '/admin',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    // props: { user: user as SessionProps },
    props: {},
  }
})

export default index
