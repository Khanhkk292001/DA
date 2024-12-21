'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { ARTICLE_SELECT_OPTION } from '../options'
import { ArticleInputType } from '../type'

export function ArticleFilter() {
  const filterColumn: FilterColumn<ExVoid<ArticleInputType>>[] = [
    {
      field: 'search',
      type: 'text',
      placeholder: 'Search',
      sx: {
        width: 280,
      },
      defaultValue: '',
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'status',
      type: 'select',
      label: 'ステータス',
      placeholder: '選択',
      options: ARTICLE_SELECT_OPTION,
      defaultValue: '',
      sx: {
        width: 120,
      },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        コンテンツ一覧
      </Typography>

      <FilterBar columns={filterColumn} createPath="articles/create" />
    </Stack>
  )
}
