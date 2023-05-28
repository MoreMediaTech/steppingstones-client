'use client'
import React from 'react'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
// import RouterTransition from '@components/RouteTransition'

export default function GlobalMantineProvider({ children }: { children: React.ReactNode}) {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      {/* <RouterTransition /> */}
      {children}
    </MantineProvider>
  )
}
