'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'

const DashboardFilter = () => {
  const filterColumn: FilterColumn<ExVoid<any>>[] = [
    {
      field: 'search',
      type: 'text',
      placeholder: 'Search',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
  ]
  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Tổng quan
      </Typography>

      <FilterBar columns={filterColumn} buttonSearchUnderButtonCreate />
    </Stack>
  )
}

export { DashboardFilter }
