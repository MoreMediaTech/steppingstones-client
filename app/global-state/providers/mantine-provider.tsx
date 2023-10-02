'use client'

import React from 'react'
import { MantineColorScheme, MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useTheme } from 'next-themes'
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

const theme = (resolvedTheme: string) =>
  createTheme({
    colors: {
      "background-dark": ["#020817", "#020817", '#020817', '#020817', '#020817', '#020817', '#020817', '#020817', '#020817', '#020817'],
    },
    primaryColor: resolvedTheme === "dark" ? 'background-dark' : "blue",
  });

export default function GlobalMantineProvider({ children }: { children: React.ReactNode}) {
  const { resolvedTheme } = useTheme()

  return (
    <MantineProvider
      theme={theme(resolvedTheme as string)}
      withCssVariables={false}
      defaultColorScheme={resolvedTheme as MantineColorScheme}
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
}
