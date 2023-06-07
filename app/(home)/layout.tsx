import React from 'react'
import { Montserrat } from 'next/font/google'
import { PageWrapper } from 'app/components/PageWrapper'
import Provider from '../global-state/providers/provider'
import { Navbar } from 'app/components/navigation'
import Footer from 'app/components/footer'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} font-montserrat sm:scroll-smooth`}
    >
      <body className="relative grid min-h-screen grid-cols-1 bg-slate-100 dark:bg-[#212227]">
        <Provider>
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
