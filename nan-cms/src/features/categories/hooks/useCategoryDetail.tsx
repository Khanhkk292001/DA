import { getCategory } from '@/libs/api/categories'
import { useQuery } from '@tanstack/react-query'

export const useCategoryDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['category-detail', id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  })

  return data
}
