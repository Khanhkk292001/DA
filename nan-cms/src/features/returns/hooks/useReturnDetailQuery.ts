import { getReturnDetail } from '@/libs/api/returns'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { QueryInputReturnDetailType, ReturnDetailResponseType } from '../type'

export const useReturnDetailQuery = (returnId: string) => {
  const { sortOptions } = useTableContext<ReturnDetailResponseType, QueryInputReturnDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['return-detail', returnId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getReturnDetail({ returnId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
