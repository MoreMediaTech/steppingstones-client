'use client'
import React from 'react'

import RTKProvider from './rtk-providers'
import NextThemeProvider from './nexttheme-provider'
import MaterialThemeProvider from './material-provider'
import GlobalMantineProvider from './mantine-provider'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RTKProvider>
      <NextThemeProvider>
        <GlobalMantineProvider>{children}</GlobalMantineProvider>
      </NextThemeProvider>
    </RTKProvider>
  )
}
