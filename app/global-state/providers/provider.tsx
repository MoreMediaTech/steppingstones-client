'use client'
import React from 'react'

import RTKProvider from './rtk-providers'
import {ThemeProvider }from './nexttheme-provider'
import GlobalMantineProvider from './mantine-provider'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RTKProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <GlobalMantineProvider>{children}</GlobalMantineProvider>
      </ThemeProvider>
    </RTKProvider>
  )
}
