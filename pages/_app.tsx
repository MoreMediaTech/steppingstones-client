import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { NotificationsProvider } from '@mantine/notifications'
import { motion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { MantineProvider, Container } from '@mantine/core'

import { store, wrapper } from 'state/store'
import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import CookieConsentComponent from '@components/CookieConsent'
import PersistLogin from 'features/auth/PersistLogin'
import { mantineTheme } from 'constants/theme'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <NotificationsProvider position="top-right">
          <MantineProvider theme={mantineTheme} withCSSVariables>
            <ThemeProvider attribute="class">
              {/* <PersistLogin /> */}
              <motion.div
                key={router.route}
                initial="initial"
                animate="animate"
                // this is a simple animation that fades in the page. You can do all kind of fancy stuff here
                variants={{
                  initial: {
                    opacity: 0,
                  },
                  animate: {
                    opacity: 1,
                  },
                }}
              >
                <Component {...pageProps} />
              </motion.div>
            </ThemeProvider>
          </MantineProvider>
        </NotificationsProvider>
      </Provider>
      <CookieConsentComponent />
    </>
  )
}

export default wrapper.withRedux(MyApp)
