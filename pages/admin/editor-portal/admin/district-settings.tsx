import { AdminLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

const DistrictSettings = () => {
  return (
    <AdminLayout title="Meetings">
      <section className="overflow-auto">
        <h1>District Settings</h1>
      </section>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {},
  }
}

export default DistrictSettings
