import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from 'app/components/navigation'
import PageWrapper from 'app/components/PageWrapper'
import Provider from '../global-state/providers/provider'
import '../globals.css'

function checkUserCookie() {
  const cookie = cookies()
  const userCookie = cookie.get('ss_refresh_token')
  if (userCookie) {
    return true
  }
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
    <html lang="en" className="sm:scroll-smooth">
      <body className="flex min-h-screen flex-row-reverse bg-slate-100 dark:bg-[#25262B]">
        <Provider>
          <AdminSidebar />
          <PageWrapper>{children}</PageWrapper>
        </Provider>
      </body>
    </html>
  )
}
