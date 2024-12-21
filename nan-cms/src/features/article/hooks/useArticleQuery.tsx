import { getListArticles } from '@/libs/api/article'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { ArticleInputType, ArticleType } from '../type'

export function useArticleQuery() {
  const { input, getTableData, sortOptions } = useTableContext<ArticleType, ArticleInputType>()

  const data = useQuery({
    queryKey: [
      'articles',
      input.page,
      input.limit,
      input.search,
      input.status,
      sortOptions?.sort_by,
      sortOptions?.column,
    ],
    queryFn: () =>
      getListArticles({
        ...input,
        ...sortOptions,
      }),
  })

  return {
    tableData: getTableData(data),
  }
}
