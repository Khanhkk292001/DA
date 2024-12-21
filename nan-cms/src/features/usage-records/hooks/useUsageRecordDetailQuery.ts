import { getUsageRecordDetail } from '@/libs/api/usage-records'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { QueryInputUsageRecordDetailType, UsageRecordDetailResponseType } from '../type'

export const useUsageRecordDetailQuery = (usageRecordId: string) => {
  const { sortOptions } = useTableContext<
    UsageRecordDetailResponseType,
    QueryInputUsageRecordDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['usage-record-detail', usageRecordId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getUsageRecordDetail({ usageRecordId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
