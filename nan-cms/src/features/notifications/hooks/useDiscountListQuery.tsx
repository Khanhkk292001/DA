import { getListDiscounts } from '@/libs/api/discount'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { DiscountSearchInputType, DiscountType } from '../type'

export const useDiscountListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    DiscountType,
    DiscountSearchInputType
  >()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['discounts-list', page, filter, limit, sort_by, column],
    queryFn: () => getListDiscounts({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
