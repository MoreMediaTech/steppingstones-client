'use client'
import React from 'react'
import { MantineProvider, ColorScheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useTheme } from 'next-themes'
// import RouterTransition from '@components/RouteTransition'

export default function GlobalMantineProvider({ children }: { children: React.ReactNode}) {
  const { resolvedTheme } = useTheme()

  return (
    <MantineProvider theme={{ colorScheme: resolvedTheme as ColorScheme }} withNormalizeCSS withGlobalStyles>
      <Notifications />
      {/* <RouterTransition /> */}
      {children}
    </MantineProvider>
  )
}
