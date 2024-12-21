'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { MaintenanceSearchInputType } from '../type'

const MaintenanceFilter = () => {
  const filterColumn: FilterColumn<ExVoid<MaintenanceSearchInputType>>[] = [
    {
      field: 'status',
      type: 'text',
      placeholder: 'Tìm kiếm',
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
        Danh sách
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="maintenances/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}

export { MaintenanceFilter }
