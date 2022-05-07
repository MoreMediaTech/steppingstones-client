import { getUser } from '@lib/getUser'
import { SessionProps } from '@lib/types'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

const index = ({ user }: { user: SessionProps }) => {
  return (
    <div>index</div>
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