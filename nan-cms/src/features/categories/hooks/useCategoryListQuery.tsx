import { getListCategories } from '@/libs/api/categories'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { CategorySearchInputType, CategoryType } from '../type'

export const useCategoryListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    CategoryType,
    CategorySearchInputType
  >()
  const { page, limit, name } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['category-list', page, name, limit, sort_by, column],
    queryFn: () => getListCategories({ ...input, name, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
