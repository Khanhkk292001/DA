import { getCategoryDetail } from '@/libs/api/categories'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { CategoryDetailResponseType, QueryInputCategoryDetailType } from '../type'

export const useCategoryDetailQuery = (categoryId: string) => {
  const { sortOptions } = useTableContext<
    CategoryDetailResponseType,
    QueryInputCategoryDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['category-detail', categoryId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getCategoryDetail({ categoryId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
