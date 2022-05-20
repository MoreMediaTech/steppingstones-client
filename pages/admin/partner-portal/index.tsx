import { useState, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getUser } from '@lib/getUser'
import { SessionProps } from '@lib/types'
import { ComponentShield } from '@components/NextShield'
import { PartnerPortalLayout } from 'layout'

const index = ({ user }: { user: SessionProps }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted && (
    <PartnerPortalLayout title="Partner Portal">
      <ComponentShield RBAC showForRole="PARTNER" userRole={user.role}>
        <section className="container mx-auto">
          <div className="text-center">
            <h1>
              Welcome <span className="uppercase">{user.name}</span> to the
              Partner Portal
            </h1>
          </div>
        </section>
      </ComponentShield>
    </PartnerPortalLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_access_token
  
  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  const user = await getUser(cookies)
  if (!user?.isAdmin) {
    return {
      redirect: {
        destination: '/not-authorized',
        permanent: false,
      },
    }
  }
  if (user?.role !== 'PARTNER') {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }

  return {
    props: { user: user as SessionProps },
  }
}

export default index
