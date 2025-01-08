'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { ReturnSearchInputType } from '../type'

const ReturnFilter = () => {
  const filterColumn: FilterColumn<ExVoid<ReturnSearchInputType>>[] = [
    {
      field: 'description',
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

      <FilterBar columns={filterColumn} createPath="returns/create" buttonSearchUnderButtonCreate />
    </Stack>
  )
}

export { ReturnFilter }
