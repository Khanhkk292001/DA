import { Checkbox } from '@mui/material'
import { ColumnDef, RowData } from '@tanstack/table-core'
import { ActionCell } from '../../components/ActionCell'
import { Action } from '../types'

const selectionColumn: ColumnDef<RowData> = {
  id: '__select',
  header: ({ table }) => (
    <Checkbox
      onClick={(e) => e.stopPropagation()}
      {...{
        checked: table.getIsAllPageRowsSelected(),
        indeterminate: table.getIsSomePageRowsSelected(),
        onChange: table.getToggleAllPageRowsSelectedHandler(),
      }}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      onClick={(e) => e.stopPropagation()}
      {...{
        checked: row.getIsSelected(),
        indeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler(),
      }}
    />
  ),
  meta: {
    width: 48,
    headStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    cellStyle: {
      textAlign: 'center',
    },
  },
}

const actionColumn: ColumnDef<RowData> = {
  id: '__action',
  header: '',
  cell: ActionCell,
  meta: {
    width: 48,
  },
}

export function useColumns<T>(
  columns: ColumnDef<T>[],
  action: Action<T> = false,
  selection = false,
) {
  function getActionCol() {
    if (typeof action === 'object') {
      return { ...actionColumn, meta: { ...actionColumn.meta, ...action?.meta } }
    }
    return actionColumn
  }

  const actionCol = action ? [getActionCol()] : []
  const selectionCol = selection ? [selectionColumn] : []

  return [...selectionCol, ...columns, ...actionCol] as ColumnDef<T>[]
}
