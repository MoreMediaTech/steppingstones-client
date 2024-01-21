'use client'
import React from 'react'

import RTKProvider from './rtk-providers'
import {ThemeProvider }from './nexttheme-provider'


export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RTKProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </RTKProvider>
  )
}
