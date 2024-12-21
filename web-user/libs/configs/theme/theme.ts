'use client'

import type { Theme } from '@mui/material'
import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Noto_Sans_JP, Quicksand } from 'next/font/google'
import { base, mono, statusColors } from './colors'

export const notoSanJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const quicksand = Quicksand({
  subsets: ['latin'], // Define character sets based on your usage
  weight: ['400', '500', '700'], // Choose weights as needed
  style: 'normal', // Choose 'italic' if needed
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
    mode: 'light',
    primary: {
      main: base.primary,
      light: base.primary_pale,
    },
    error: {
      main: statusColors.error,
      light: statusColors.error_pale,
    },
    warning: {
      main: statusColors.warn,
      light: statusColors.warn_pale,
    },
    success: {
      main: statusColors.success,
      light: statusColors.success_pale,
    },
    info: {
      main: statusColors.assistant,
      light: statusColors.assistant_pale,
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
      fontFamily: quicksand.style.fontFamily,
    },
    fontFamily: quicksand.style.fontFamily,
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
          borderRadius: 2,
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
          background: '#ededed',
          color: mono[600],
          outline: 'none',
          paddingRight: 0,
          borderRadius: 4,
          fontWeight: 400,
          height: 55,
          transition: 'all 0.3s',
          '&.Mui-focused': {
            transition: 'all 0.3s',
            background: base.white,
          },

          '& .MuiOutlinedInput-input': {
            fontSize: 16,
            lineHeight: '20px',
            height: 30,
            padding: '12px 10px 12px 16px',
            fontWeight: 500,
            fontStyle: 'italic',
            webkitTextFillColor: mono[600],
          },
          '&.MuiOutlinedInput-root': {
            fieldset: {
              borderColor: '#ededed',
            },
            '&.Mui-focused fieldset': {
              border: `1px solid #ededed`,
            },
            '&:hover fieldset': {
              border: `1px solid #ededed`,
            },
            '&.Mui-disabled fieldset': {
              borderColor: '#ededed',
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
            top: 15,
          },
          '& .MuiOutlinedInput-input': {
            color: mono[600],
            padding: '0 10px 0 16px',
            fontSize: 16,
            lineHeight: '20px',
            height: 20,
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
          color: grey[600],
          background: base.primary_pale,
        },
        arrow: {
          color: base.primary_pale,
        },
      },
    },
  },
})

defaultTheme.shadows[1] = '0px 2px 11px 0px #3B3C3E2E'

export { defaultTheme }
