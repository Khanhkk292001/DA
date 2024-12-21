'use client'

import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { TABLE_CELL_ROW_HEIGHT, TABLE_HEADER_ROW_HEIGHT } from './TableRender'

export type TableSkeletonType = {
  row_number?: number
  col_number?: number
}

const TableSkeleton: React.FC<TableSkeletonType> = ({ col_number = 5, row_number = 10 }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {new Array(col_number).fill(0).map((el, idx) => (
            <TableCell height={TABLE_HEADER_ROW_HEIGHT} key={idx} padding="checkbox">
              <Skeleton height="100%" />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {new Array(row_number).fill(0).map((el, idx) => (
          <TableRow key={idx}>
            <TableCell height={TABLE_CELL_ROW_HEIGHT} colSpan={col_number} padding="checkbox">
              <Skeleton height="100%" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { TableSkeleton }
