'use client'
import React from 'react'
import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useTheme } from 'next-themes'
import { themeSettings } from 'constants/styles'
import { PaletteMode } from '@lib/types'

export default function MaterialThemProvider({ children }: { children: React.ReactNode}) {
    const { theme: mode } = useTheme()
      const theme = React.useMemo(
        () => createTheme(themeSettings(mode as PaletteMode)),
        [mode]
      )
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
