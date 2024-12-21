'use client'

import { Stack } from '@mui/material'
import { Notification } from './Notification'

export const HEADER_HEIGHT = 50

export const Header = () => {
  return (
    <Stack
      left={0}
      right={0}
      top={0}
      height={HEADER_HEIGHT}
      position="fixed"
      sx={{ backgroundColor: 'white' }}
      zIndex={1000}
      justifyContent="flex-end"
      alignContent="center"
    >
      <Notification />
    </Stack>
  )
}
