import React from 'react'
import { Montserrat } from 'next/font/google'
import { Toaster } from '@app/components/ui/toaster'
import PageWrapper from './PageWrapper'
import Provider from '../global-state/providers/provider'
import { Navbar } from 'app/components/navigation'
import Footer from 'app/components/footer'
import '../globals.css'
import CookieConsentComponent from '@components/CookieConsent/CookieConsentComponent'

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
      className={`${montserrat.variable} light font-montserrat sm:scroll-smooth`}
      style={{ scrollBehavior: 'smooth', colorScheme: 'light' }}
    >
      <body className="relative grid min-h-screen grid-cols-1 bg-background">
        <Provider>
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
          <Toaster />
          <CookieConsentComponent />
        </Provider>
      </body>
    </html>
  )
}
