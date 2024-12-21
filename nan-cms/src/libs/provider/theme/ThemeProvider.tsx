'use client'

import createCache, { Options } from '@emotion/cache'
import { CacheProvider, ThemeProvider as MuiThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useServerInsertedHTML } from 'next/navigation'
import { SnackbarProvider } from 'notistack'
import { useState } from 'react'
import { defaultTheme } from '../../config/theme'

type ThemeProviderProps = Readonly<{
  children: React.ReactNode
  options: Options
}>

function ThemeProvider({ children, options }: ThemeProviderProps) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    // @ts-ignore
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={defaultTheme}>
        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />

          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export { ThemeProvider }
