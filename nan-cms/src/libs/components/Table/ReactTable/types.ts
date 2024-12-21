import { TableProps } from '@mui/material'
import { Cell, Column, Header } from '@tanstack/react-table'
import {
  ColumnMeta,
  PaginationState,
  Row,
  RowData,
  Table,
  TableOptions,
} from '@tanstack/table-core'
import React, { CSSProperties } from 'react'

export type ActionConfig<T extends RowData> = {
  onDetail?: (id: string | number, row: Row<T>) => void
  disabledDetail?: boolean
  detailIcon?: React.ReactNode
  renderLeft?: (row: Row<T>) => React.ReactNode
  renderRight?: (row: Row<T>) => React.ReactNode
  meta?: ColumnMeta<T, unknown>
  onSetTop?: (id: string | number, row: Row<T>) => void
  setTopIcon?: React.ReactNode
}

export type Action<T extends RowData> = ActionConfig<T> | boolean

export type PaginationProps = {
  pageCount?: number
  total?: number
  paginationParams?: PaginationParams
  handleChangePagination?: (paginationParams: Partial<PaginationParams>) => void
  manualPagination?: boolean
}

export interface TableProperties<T extends RowData> extends TableOptions<T> {
  onRowClick?: (row: Row<T>) => void
  onClickAway?(): void
  loading?: boolean
  isPreviousData?: boolean
  disabledRowClick?: boolean
  id?: string
  selection?: boolean
  action?: Action<T>
  tableProps?: TableProps
  paginationProps?: PaginationProps
  freeContainerHeight?: boolean
  pageCount?: number
  total?: number
  handleChangePagination?: (paginationParams: Partial<PaginationParams>) => void
  paginate?: PaginationParams
  hiddenPagination?: boolean
  onCopy?: (id: string | number) => void
  next: number
}

export interface ReactTableContextValue<T> {
  instance: Table<T>
  onRowClick?: () => void
  onClickAway?(): void
  loading?: boolean
  hasRowClick: boolean
  data: T[]
  action?: Action<T>
  tableProps?: TableProps
  pagination: PaginationProps & { state: PaginationState }
  freeContainerHeight?: boolean
  hiddenPagination?: boolean
  onCopy?: (id: string | number) => void
  next: number
}

export type PaginationParams = {
  page: number
  limit: number
}

export type MakePaginationOptional<T> = Omit<Exclude<T, void>, 'page' | 'limit'> &
  Partial<PaginationParams>

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void
    expand?: boolean
    toggleExpand?(): void
    canEdit?: boolean
    action?: Action<TData>
    globalCellStyles?: React.CSSProperties
    truncate?: boolean
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    width?: CSSProperties['width']
    align?: 'right' | 'left'
    editable?: boolean
    editType?: 'number' | 'text'
    headStyle?: React.CSSProperties
    cellStyle?: React.CSSProperties
    renderProps?: Record<string, unknown>
    truncate?: boolean
  }
}

export type ReactTableCellProps<TData extends RowData, TValue = unknown> = {
  table: Table<TData>
  row: Row<TData>
  column: Column<TData, TValue>
  cell: Cell<TData, TValue>
  getValue: () => unknown
  renderValue: () => unknown
}

export type ReactTableHeaderProps<TData extends RowData, TValue = unknown> = {
  table: Table<TData>
  header: Header<TData, TValue>
  column: Column<TData>
}

export type DefaultTableColumnMeta = {
  width?: number
}

export type TableSide = 'center' | 'left' | 'right'

export type PositionProps = {
  right?: boolean
  left?: boolean
}

export type PaginationMeta = {
  isFirstPage: boolean
  isLastPage: boolean
  currentPage: number
  previousPage?: number
  nextPage?: number
  pageCount: number
  totalCount: number
}
