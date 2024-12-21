'use client'

import { Stack, Typography } from '@mui/material'

const NoData = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="90vh">
      <Typography variant="h3" color="mono.600">
        No data!
      </Typography>
    </Stack>
  )
}

export { NoData }
