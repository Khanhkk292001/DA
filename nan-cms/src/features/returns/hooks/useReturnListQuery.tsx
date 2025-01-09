import { getListReturns } from '@/libs/api/returns'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { ReturnSearchInputType, ReturnType } from '../type'

export const useReturnListQuery = (isFullyReturned: string) => {
  const { input, getTableData, sortOptions } = useTableContext<ReturnType, ReturnSearchInputType>()
  const { page, limit, description } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['returns-list', page, description, limit, sort_by, column, isFullyReturned],
    queryFn: () =>
      getListReturns({ ...input, description, isFullyReturned, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
