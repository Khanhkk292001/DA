import { getDiscountDetail } from '@/libs/api/discount'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { DiscountDetailResponseType, QueryInputDiscountDetailType } from '../type'

export const useDiscountDetailQuery = (discountId: string) => {
  const { sortOptions } = useTableContext<
    DiscountDetailResponseType,
    QueryInputDiscountDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['discount-detail', discountId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getDiscountDetail({ discountId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
