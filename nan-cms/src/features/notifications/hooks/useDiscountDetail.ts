import { getDiscount } from '@/libs/api/discount'
import { useQuery } from '@tanstack/react-query'

export const useDiscountDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['discount-detail', id],
    queryFn: () => getDiscount(id),
    enabled: !!id,
  })

  return data
}
