import { base } from '@/libs/config/theme'
import {
  Table as MuiTable,
  Stack,
  styled,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
  Typography,
} from '@mui/material'
import { flexRender, RowData, Row as RowType, Table } from '@tanstack/react-table'
import SortIcon from 'public/assets/svgs/sort.svg'
import React, { useMemo } from 'react'
import { useTableContext } from '.'
import { TextOverflow } from '../TextOverflow'
import { TABLE_CELL_HEADER_HEIGHT, TABLE_CELL_ROW_HEIGHT } from './ReactTable/TableRender'
import { ButtonAction } from './styled'
import { getTableSide } from './utils'

type TableSide = 'center' | 'left' | 'right'

export type TableRendererProps<T extends RowData> = {
  position?: TableSide
  dataSide?: TableSide
  tableProps?: TableProps
  instance: Table<T>
  noHeader?: boolean
  onRowClick?(row: RowType<T>): void
  hasRowClick?: boolean
  isEmpty?: boolean
}

function TableRenderer<T extends RowData>({
  position,
  dataSide,
  instance,
  tableProps,
  noHeader,
  hasRowClick,
  onRowClick = () => undefined,
  isEmpty,
}: TableRendererProps<T>) {
  const tableSide = useMemo(() => {
    const side = dataSide || position
    return getTableSide(side)
  }, [position, dataSide])

  const { handleSort } = useTableContext()

  const StyledTableRow = styled(TableRow)`
    &:hover {
      background-color: #e6e6e6;
      cursor: pointer;
    }
  `

  return (
    <>
      <MuiTable {...tableProps} sx={{ background: base.white, tableLayout: 'fixed' }}>
        {!noHeader && (
          <TableHead sx={{ backgroundColor: base.separate_contents }}>
            {instance[tableSide.headerGroupKey as 'getHeaderGroups']().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const def = header.column.columnDef
                  const metaWidth = def.meta?.width
                  const width = metaWidth ?? 'auto'
                  const style = def.meta?.headStyle

                  return (
                    <TableCell
                      key={header.id}
                      height={TABLE_CELL_HEADER_HEIGHT}
                      width={width}
                      padding="none"
                    >
                      {header.isPlaceholder ? null : (
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          gap={0.5}
                          width={width}
                          color="grey.500"
                          fontSize="12px"
                          lineHeight="18px"
                          style={style}
                          fontWeight={700}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <ButtonAction onClick={() => handleSort(header.id)}>
                              <SortIcon />
                            </ButtonAction>
                          )}
                        </Stack>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
        )}

        {isEmpty ? (
          <Typography>Empty</Typography>
        ) : (
          <TableBody>
            {instance.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <StyledTableRow onClick={() => hasRowClick && onRowClick(row)} key={row.id}>
                  {row[tableSide.cellKey as 'getVisibleCells']().map((cell) => {
                    const def = cell.column.columnDef
                    const cellRender = def.cell
                    const metaWidth = def.meta?.width
                    const width = metaWidth ?? 'auto'
                    const style = def.meta?.cellStyle

                    return (
                      <TableCell
                        key={cell.id}
                        width={width}
                        height={TABLE_CELL_ROW_HEIGHT}
                        padding="none"
                      >
                        {!(cell.column.id === '__action' || cell.column.id === 'status') ? (
                          <TextOverflow width={width} color="grey.600" style={style}>
                            {flexRender(cellRender, cell.getContext())}
                          </TextOverflow>
                        ) : (
                          flexRender(cellRender, cell.getContext())
                        )}
                      </TableCell>
                    )
                  })}
                </StyledTableRow>
              </React.Fragment>
            ))}
          </TableBody>
        )}
      </MuiTable>
    </>
  )
}

export { TableRenderer }
