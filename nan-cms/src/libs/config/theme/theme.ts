'use client'

import type { Theme } from '@mui/material'
import { createTheme } from '@mui/material'
import { Fira_Sans } from 'next/font/google'
import { base, mono, statusColors } from './colors'

export const notoSanJP = Fira_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

declare module '@mui/material' {
  interface Palette {
    base: typeof base
    status: typeof statusColors
    mono: typeof mono
  }

  interface PaletteOptions {
    base: typeof base
    status: typeof statusColors
    mono: typeof mono
  }
}

const defaultTheme: Theme = createTheme({
  palette: {
    common: {
      white: base.bg_light,
      black: mono[500],
    },
    primary: {
      main: base.primary,
      light: base.bg_light,
      contrastText: base.primary,
    },
    grey: {
      900: mono[900],
      600: mono[600],
      500: mono[500],
      200: mono[200],
      50: mono[50],
    },
    success: {
      main: statusColors.success,
    },
    info: {
      main: statusColors.assistant,
    },
    background: {
      default: base.bg_secondary,
    },
    text: {
      primary: mono[900],
      secondary: mono[600],
    },
    base,
    status: statusColors,
    mono,
  },
  typography: {
    h1: {
      fontSize: 24,
      lineHeight: '24px',
      fontWeight: 700,
    },
    h2: {
      fontSize: 22,
      lineHeight: '22px',
      fontWeight: 700,
    },
    h3: {
      fontSize: 18,
      lineHeight: '18px',
      fontWeight: 700,
    },
    h4: {
      fontSize: 16,
      lineHeight: '16px',
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 500,
    },
    body2: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
      lineHeight: '16px',
      fontWeight: 500,
    },
    caption: {
      fontSize: 11,
      lineHeight: '16px',
      fontWeight: 500,
    },
    button: {
      fontFamily: notoSanJP.style.fontFamily,
    },
    fontFamily: notoSanJP.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          gap: 4,
          height: 48,
          fontSize: 16,
          flexShrink: 0,
          fontWeight: 500,
          borderRadius: 8,
          boxShadow: 'none',
          lineHeight: '16px',
          fontStyle: 'normal',
          padding: '10px 24px',
          textTransform: 'none',
        },
        contained: {
          background: base.black,
          color: base.white,
          ':hover': {
            backgroundColor: base.black,
            boxShadow: 'none',
          },
          ':focus': {
            backgroundColor: base.black,
          },
          ':disabled': {
            backgroundColor: mono[600],
            color: base.white,
          },
        },
        outlined: {
          background: base.white,
          border: `1px solid ${base.black}`,
          color: base.black,
          ':hover': {
            background: base.white,
            border: `1px solid ${base.black}`,
          },
          ':focus': {
            background: base.white,
            border: `1px solid ${base.black}`,
          },
          ':disabled': {
            color: mono[200],
            borderColor: mono[200],
          },
        },
        startIcon: {
          marginRight: 0,
          marginLeft: 0,
          width: 16,
          height: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '6.5px 8px 6.5px 12px',
          borderColor: base.primary,
          borderRadius: 70,
          height: 24,
          span: {
            lineHeight: '11px',
            fontSize: 11,
            fontWeight: 500,
          },
        },
        label: {
          padding: 0,
        },
        deleteIcon: {
          marginLeft: 4,
          marginRight: 0,
          width: 14,
          justifyContent: 'flex-end',
        },
        outlined: {
          backgroundColor: base.bg_light,
          color: base.primary,
          '&:hover': {
            backgroundColor: base.bg_light,
            color: base.primary,
          },
        },
        filled: {
          backgroundColor: base.primary,
          color: base.white,
          '&:hover': {
            backgroundColor: base.primary,
            color: base.white,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 12,
          lineHeight: '16px',
          color: mono[500],
          '&.Mui-focused': {
            color: mono[500],
          },
          '&.Mui-error': {
            color: mono[500],
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontSize: 12,
          lineHeight: '16px',
          color: statusColors.error,
          marginRight: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: base.white,
          color: mono[600],
          outline: 'none',
          paddingRight: 0,
          borderRadius: 4,
          fontWeight: 400,
          '& .MuiOutlinedInput-input': {
            fontSize: 14,
            lineHeight: '20px',
            fontStyle: 'normal',
            height: 16,
            padding: '12px 10px 12px 16px',
            webkitTextFillColor: mono[600],
          },
          '&.MuiOutlinedInput-root': {
            fieldset: {
              borderColor: base.separate_nav,
            },
            '&.Mui-focused fieldset': {
              border: `1px solid ${base.separate_nav}`,
            },
            '&:hover fieldset': {
              border: `1px solid ${base.separate_nav}`,
            },
            '&::placeholder': {
              color: mono[200],
            },
          },
          '&.Mui-error': {
            '&.Mui-focused fieldset': {
              border: `1px solid ${statusColors.error}`,
            },
            '&:hover fieldset': {
              border: `1px solid ${statusColors.error}`,
            },
          },
        },
        adornedStart: {
          paddingLeft: 12,
          '& .MuiInputAdornment-root': {
            marginRight: 0,
          },
          '& .MuiOutlinedInput-input': {
            padding: '12px 10px 12px 0px',
          },
        },
        adornedEnd: {
          '& .MuiOutlinedInput-input': {
            padding: '12px 0px 12px 16px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiSelect-icon': {
            top: 9,
          },
          '& .MuiOutlinedInput-input': {
            color: mono[600],
            padding: '0 10px 0 16px',
            fontSize: 14,
            lineHeight: '20px',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '&.MuiList-root': {
            paddingBottom: 0,
            paddingTop: 0,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          lineHeight: '16px',
          color: base.white,
        },
      },
    },
  },
})

defaultTheme.shadows[1] = '0px 2px 11px 0px #3B3C3E2E'

export { defaultTheme }
