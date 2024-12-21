import { PaginationState, Row, RowData, getPaginationRowModel } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { PaginationProps } from '../types'

export function usePaginationState<T extends RowData>(props: PaginationProps = {}) {
  const { pageCount, total, handleChangePagination, paginationParams, manualPagination } = props
  const [pagination, onPaginationChange] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const isControlled = manualPagination

  const pagiState = isControlled ? { pagination } : {}
  const pagiTableOptions = useMemo(
    () =>
      isControlled
        ? {
            manualPagination,
            pageCount,
            onPaginationChange,
            getRowId(originalRow: T, _index: number, parent: Row<T> | undefined) {
              return parent
                ? [parent.id, (originalRow as { id: string | number }).id.toString()].join('.')
                : (originalRow as { id: string | number }).id.toString()
            },
          }
        : {
            getPaginationRowModel: getPaginationRowModel(),
          },
    [isControlled, manualPagination, pageCount],
  )

  const pagiMeta = useMemo(
    () => ({
      pageCount,
      total,
      paginationParams,
      handleChangePagination,
      state: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      manualPagination,
    }),
    [handleChangePagination, manualPagination, pageCount, pagination, paginationParams, total],
  )

  return { pagiState, pagiTableOptions, pagiMeta }
}
