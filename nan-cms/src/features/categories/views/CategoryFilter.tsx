'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { CategorySearchInputType } from '../type'

const CategoryFilter = () => {
  const filterColumn: FilterColumn<ExVoid<CategorySearchInputType>>[] = [
    {
      field: 'name',
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
        createPath="categories/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}

export { CategoryFilter }
