import { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {
  CssBaseline,
  ThemeProvider as MaterialThemeProvider,
} from '@mui/material'
import { NotificationsProvider } from '@mantine/notifications'
import { motion } from 'framer-motion'
import { ThemeProvider, useTheme } from 'next-themes'
import { MantineProvider, Container } from '@mantine/core'
import { createTheme } from '@mui/material/styles'

import { store, wrapper } from 'state/store'
import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import CookieConsentComponent from '@components/CookieConsent'
import PersistLogin from 'features/auth/PersistLogin'
import { mantineTheme } from 'constants/theme'
import { themeSettings } from 'constants/styles'
import { PaletteMode } from '@lib/types'

function MyApp({ Component, pageProps, router }: AppProps) {
  const { theme: mode } = useTheme()
   const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode])
  return (
    <>
      <Provider store={store}>
        <NotificationsProvider position="top-right">
          <MantineProvider theme={mantineTheme} withCSSVariables>
            <ThemeProvider attribute="class">
              <MaterialThemeProvider theme={theme}>
                <CssBaseline />
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
              </MaterialThemeProvider>
            </ThemeProvider>
          </MantineProvider>
        </NotificationsProvider>
      </Provider>
      <CookieConsentComponent />
    </>
  )
}

export default wrapper.withRedux(MyApp)
