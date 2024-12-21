'use client'

import { defaultTheme } from '@/libs/configs'
import { Options } from '@emotion/cache'
import { ThemeProvider as MuiThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { vi } from 'date-fns/locale'

type ThemeProviderProps = Readonly<{
  children: React.ReactNode
  options: Options
}>

function ThemeProvider({ children, options }: ThemeProviderProps) {
  return (
    <AppRouterCacheProvider options={options}>
      <MuiThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
          <CssBaseline />

          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  )
}

export { ThemeProvider }
