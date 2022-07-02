import AdminUsersSection from '@components/AdminUsersSection'
import { AdminLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

const Users = () => {
  return (
    <AdminLayout title="Admin Users">
      <section className="overflow-auto">
        <AdminUsersSection />
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


export default Users