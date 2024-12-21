import { getCategoryValueLabels } from '@/libs/api/categories'
import { useQuery } from '@tanstack/react-query'

export const useCategoryValueLabel = () => {
  const data = useQuery({
    queryKey: ['category-value-label'],
    queryFn: () => getCategoryValueLabels(),
  })
  return data
}
