import { getListRentals } from '@/libs/api/rentals'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { RentalSearchInputType, RentalType } from '../type'

export const useRentalListQuery = (status: string) => {
  const { input, getTableData, sortOptions } = useTableContext<RentalType, RentalSearchInputType>()
  const { page, limit } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['rental-list', page, status, limit, sort_by, column],
    queryFn: () => getListRentals({ ...input, limit, status, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
    refetch: data.refetch,
  }
}
