import { Stack, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { TableSkeleton } from '.'
import { TableRenderer } from '../TableRerender'
import { TablePagination } from './Pagination'
import { useReactTableContext } from './context'

export const TABLE_CELL_ROW_HEIGHT = 52
export const TABLE_HEADER_ROW_HEIGHT = 40
export const TABLE_CELL_HEADER_HEIGHT = 48

function TableRender(): ReactElement {
  const { loading, data, instance, onRowClick, tableProps, hasRowClick } = useReactTableContext()

  if (loading) {
    return <TableSkeleton />
  }

  if (data.length === 0 && !loading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="60vh">
        <Typography variant="h3" color="mono.600">
          Không có dữ liệu!
        </Typography>
      </Stack>
    )
  }

  return (
    <>
      <TableRenderer
        instance={instance}
        isEmpty={false}
        tableProps={tableProps}
        onRowClick={onRowClick}
        hasRowClick={hasRowClick}
      />

      <TablePagination />
    </>
  )
}

export { TableRender }
