import { AdminLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

const AdminHome = () => {
  return (
    <AdminLayout>AdminHome</AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const cookies = req.cookies.ss_access_token
  
  // if (!cookies) {
  //   context.res.writeHead(302, {
  //     Location: '/auth/login',
  //   })
  //   context.res.end()
  // }
  return {
    props: {}
  }
}

export default AdminHome