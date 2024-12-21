'use client'

import { PaginationType } from '@/libs/types/pagination'
import { UseQueryResult } from '@tanstack/react-query'
import { Context, createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MakePaginationOptional, PaginationProps } from './ReactTable/types'

type PaginationParams = {
  page: number
  limit: number
}

type SortParams = {
  sort_by: 'asc' | 'desc'
  column: string
}

type PaginationDataType<TData> = { data: TData[] } & PaginationType

export type TableContextValue<TData, Input> = {
  pagination: PaginationParams
  input: Input
  getTableData: (result: UseQueryResult<PaginationDataType<TData>>) => {
    data: TData[]
    loading: boolean
    paginationProps: PaginationProps
    resetPagination: (paginationParams?: PaginationParams) => void
  }
  handleChangeParams: (
    newParams: MakePaginationOptional<Input>,
    mergeParams?: boolean,
    resetPaginationMeta?: boolean,
  ) => void
  handleChangePagination: (paginationParams: Partial<PaginationParams>) => void
  setFilterOptions: React.Dispatch<React.SetStateAction<Record<keyof Input, unknown>>>
  handleSort: (columnName: string) => void
  sortOptions?: SortParams
}

export const TableContext = createContext<TableContextValue<unknown, unknown>>(
  {} as TableContextValue<unknown, unknown>,
)

export function useTableContext<TData, Input>() {
  const ctx = useContext<TableContextValue<TData, Input>>(
    TableContext as Context<TableContextValue<TData, Input>>,
  )
  if (!ctx || Object.keys(ctx).length === 0) {
    throw new Error('useTableContext must be used within a TableProvider')
  }

  return ctx
}

export type TableProviderProps<Input> = {
  initialParams?: MakePaginationOptional<Input>
}

export function TableProvider<TData, Input>({
  initialParams,
  children,
}: React.PropsWithChildren<TableProviderProps<Input>>) {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
  })

  const [params, setParams] = useState<Input>(initialParams as Input)
  const [filterOptions, setFilterOptions] = useState<Record<keyof Input, unknown> | undefined>()
  const [sortOptions, setSortOptions] = useState<SortParams | undefined>()
  const handleChangePagination = useCallback((paginationParams: Partial<PaginationParams>) => {
    setPagination((pre) => ({ ...pre, ...paginationParams }))
  }, [])

  const resetPagination = useCallback(
    (paginationParams?: PaginationParams) => {
      if (paginationParams) {
        setPagination(paginationParams)
      } else {
        setPagination({
          page: 1,
          limit: pagination.limit,
        })
      }
    },
    [pagination],
  )

  const handleChangeParams = useCallback(
    (newParams: MakePaginationOptional<Input>, mergeParams = true, resetPaginationMeta = true) => {
      // remove properties with undefined or empty string value
      const validate = (p: MakePaginationOptional<Input>) =>
        Object.entries(p).reduce((acc, [key, value]) => {
          if (value !== undefined && (value as unknown) !== '' && value !== null) {
            acc[key as keyof MakePaginationOptional<Input>] =
              value as MakePaginationOptional<Input>[keyof MakePaginationOptional<Input>]
          }
          return acc
        }, {} as MakePaginationOptional<Input>)

      const _update = (prev: Input) => {
        return (mergeParams ? validate({ ...prev, ...newParams }) : validate(newParams)) as Input
      }

      setParams(_update)

      if (resetPaginationMeta) {
        resetPagination({
          page: 1,
          limit: pagination.limit,
        })
      }
    },

    [pagination.limit, resetPagination],
  )
  const getTableData: TableContextValue<TData, Input>['getTableData'] = useCallback(
    (result: UseQueryResult<PaginationDataType<TData>>) => {
      const { data, isLoading, refetch } = result

      return {
        paginationProps: {
          paginationParams: pagination,
          pageCount: data?.limit,
          total: data?.total,
          handleChangePagination,
          manualPagination: true,
        },
        data: (data?.data || []) as TData[],
        loading: isLoading,
        resetPagination,
        refetch,
      }
    },
    [pagination, handleChangePagination, resetPagination],
  )

  const handleSort = useCallback((columnName: string) => {
    setSortOptions((prev) => {
      if (prev?.column === columnName) {
        return {
          column: columnName,
          sort_by: prev.sort_by === 'desc' ? 'asc' : 'desc',
        }
      }
      return {
        column: columnName,
        sort_by: 'desc',
      }
    })
  }, [])

  const input = useMemo(() => {
    const _params = params ?? {}
    const isEmptyParams = Object.keys(_params).length === 0
    return {
      ...pagination,
      ...params,
      ...(!isEmptyParams && {
        options: Object.keys(_params).reduce(
          (acc, key) => {
            acc[key as keyof Input] = {
              ...(filterOptions?.[key as keyof Input] ?? {}),
            }
            return acc
          },
          {} as Record<keyof Input, unknown>,
        ),
      }),
    } as Input
  }, [pagination, params, filterOptions])

  const ctxValue = useMemo(
    () => ({
      pagination,
      input,
      getTableData,
      handleChangeParams,
      handleChangePagination,
      setFilterOptions,
      handleSort,
      manualPagination: true,
      sortOptions,
    }),
    [
      pagination,
      input,
      getTableData,
      handleChangeParams,
      handleChangePagination,
      handleSort,
      sortOptions,
    ],
  ) as unknown as TableContextValue<unknown, unknown>

  return <TableContext.Provider value={ctxValue}>{children}</TableContext.Provider>
}
