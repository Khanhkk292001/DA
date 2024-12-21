'use client'

import { Table, TableBody, TableCell, TableHead, TableProps, TableRow } from '@mui/material'
import {
  Cell,
  Header,
  HeaderGroup,
  RowData,
  Row as RowType,
  flexRender,
} from '@tanstack/react-table'
import { TABLE_CELL_HEADER_HEIGHT } from './ReactTable/TableRender'

export type FilterCellType<T extends RowData> = (
  headers: Header<T, unknown>[] | Cell<T, unknown>[],
) => Header<T, unknown>[] | Cell<T, unknown>[]

export type TableLeafRendererProps<T extends RowData> = {
  headerGroups: HeaderGroup<T>[]
  rows: RowType<T>[]
  filterCell: FilterCellType<T>
} & TableProps

function TableLeafRenderer<T>({
  headerGroups,
  rows,
  filterCell,
  ...tableProps
}: TableLeafRendererProps<T>) {
  return (
    <Table {...tableProps}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {(filterCell(headerGroup.headers) as Header<T, unknown>[]).map((header) => (
              <TableCell
                key={header.id}
                colSpan={header.colSpan}
                width={header.getSize()}
                height={TABLE_CELL_HEADER_HEIGHT}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {(filterCell(row.getVisibleCells()) as Cell<T, unknown>[]).map((cell) => (
              <TableCell key={cell.id} width={cell.column.getSize()}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { TableLeafRenderer }
