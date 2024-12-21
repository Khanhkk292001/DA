'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { RepairRecordSearchInputType } from '../type'

const RepairRecordFilter = () => {
  const filterColumn: FilterColumn<ExVoid<RepairRecordSearchInputType>>[] = [
    {
      field: 'filter',
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
        Danh sách lịch sử sử dụng thiết bị
      </Typography>

      <FilterBar columns={filterColumn} buttonSearchUnderButtonCreate />
    </Stack>
  )
}

export { RepairRecordFilter }
