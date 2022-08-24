import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { NotificationsProvider } from '@mantine/notifications'
import { store, wrapper } from 'app/store'
import { AnimatePresence } from 'framer-motion'
import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import CookieConsentComponent from '@components/CookieConsent'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Provider store={store}>
        <NotificationsProvider position="top-right">
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} />
          </AnimatePresence>
        </NotificationsProvider>
      </Provider>
      <CookieConsentComponent />
    </>
  )
}

export default wrapper.withRedux(MyApp)
