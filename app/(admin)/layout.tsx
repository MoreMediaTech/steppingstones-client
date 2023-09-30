import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Toaster } from '@components/ui/toaster'
import  AdminPageWrapper  from './AdminPageWrapper'
import Provider from '../global-state/providers/provider'
import '../globals.css'

function checkUserCookie() {
  const cookie = cookies()
  console.log('checking auth');
  const userCookie = cookie.get('ss_refresh_token')
  if (userCookie) {
    console.log("authn checked");
    return true
  }
  console.log("auth failed");
  return false
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!checkUserCookie()) {
    return redirect('/auth/login')
  }
  return (
    <html lang="en" className={`font-montserrat sm:scroll-smooth`}>
      <body className="min-h-screen bg-background">
        <Provider>
          <AdminPageWrapper>{children}</AdminPageWrapper>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
