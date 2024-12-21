'use client'

import { Box, BoxProps, Stack, styled } from '@mui/material'
import React from 'react'
import { Footer } from './Footer'
import { Header, HEADER_HEIGHT } from './Header'

type LayoutType = BoxProps<
  'div',
  {
    children: React.ReactNode
    HeaderComponent?: React.ReactNode
    disableSidebar?: boolean
  }
>

const LayoutPage: React.FC<LayoutType> = ({ children, HeaderComponent, disableSidebar = false, ...contentProps }) => {
  return (
    <Stack direction="column">
      <Header />
      <ContentPage {...contentProps}>{children}</ContentPage>
      <Footer />
    </Stack>
  )
}

export { LayoutPage }

const ContentPage = styled(Box)(({ theme }) => ({
  minHeight: '60vh',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  marginTop: HEADER_HEIGHT + 20,
  backgroundColor: '#f7f7f7',
  paddingBottom: theme.spacing(4),
}))
