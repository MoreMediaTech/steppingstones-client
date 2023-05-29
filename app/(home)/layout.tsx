import React from 'react'
import PageWrapper from '@components/PageWrapper'
import Provider from '../global-state/providers/provider'
import { Navbar } from '@components/navigation'
import Footer from '@components/footer'
import '../globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="sm:scroll-smooth">
      <body className="relative grid min-h-screen grid-cols-1 bg-slate-100 dark:bg-slate-900">
        <Provider>
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
