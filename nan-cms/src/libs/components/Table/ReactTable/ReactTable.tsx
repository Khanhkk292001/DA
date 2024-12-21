'use client'

import { Box } from '@mui/material'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { RowData, RowSelectionState, Table as TableInstance } from '@tanstack/table-core'
import React, {
  ReactElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { TABLE_BOTTOM_TAB_HEIGHT, TableBottomTab } from '../components/TableBottomTab'
import { PAGINATION_HEIGHT } from './Pagination'
import { TableRender } from './TableRender'
import { ReactTableProvider } from './context'
import { useColumns, usePaginationState } from './hooks'
import { ReactTableContextValue, TableProperties } from './types'

declare module 'react' {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

export type ReactTableProps<T extends RowData> = Omit<TableProperties<T>, 'getCoreRowModel'>

function ReactTableWithRef<T extends RowData>(
  props: ReactTableProps<T>,
  ref: React.ForwardedRef<TableInstance<T>>,
): ReactElement {
  const {
    columns: originalColumns,
    data,
    onRowClick,
    paginationProps,
    loading,
    disabledRowClick,
    selection,
    action,
    onCopy,
    tableProps,
    freeContainerHeight,
    hiddenPagination,
    next,
    ...useTableOptions
  } = props
  const columns = useColumns(originalColumns, action, selection)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const { pagiState, pagiTableOptions, pagiMeta } = usePaginationState<T>(paginationProps)

  const instance = useReactTable({
    data,
    columns,
    state: {
      ...pagiState,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    ...useTableOptions,
    meta: {
      ...useTableOptions.meta,
      action,
    },
    ...pagiTableOptions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      sortingFn: 'alphanumericCaseSensitive',
      sortDescFirst: false,
    },
    pageCount: paginationProps?.pageCount,
  })

  useImperativeHandle(ref, () => instance, [instance])

  const hasRowClick = typeof onRowClick === 'function' && !disabledRowClick

  useEffect(() => {
    if (hiddenPagination && !loading) instance.setPageSize(data.length)
  }, [hiddenPagination, loading, data.length, instance])

  const value = useMemo(
    () => ({
      instance,
      onRowClick,
      loading,
      hasRowClick,
      pagination: pagiMeta,
      data,
      tableProps,
      freeContainerHeight,
      hiddenPagination,
      onCopy,
      next,
    }),
    [
      instance,
      onRowClick,
      loading,
      hasRowClick,
      data,
      tableProps,
      freeContainerHeight,
      pagiMeta,
      hiddenPagination,
      onCopy,
      next,
    ],
  )

  const isSelected = instance.getSelectedRowModel().flatRows.length > 0

  return (
    <ReactTableProvider value={value as ReactTableContextValue<unknown>}>
      <Box mb={isSelected ? `${TABLE_BOTTOM_TAB_HEIGHT}px` : `${PAGINATION_HEIGHT}px`}>
        <TableRender />
      </Box>

      <TableBottomTab />
    </ReactTableProvider>
  )
}

const ReactTable = forwardRef(ReactTableWithRef)

export { ReactTable }
