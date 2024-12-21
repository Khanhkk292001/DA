import { getUsageRecord } from '@/libs/api/usage-records'
import { useQuery } from '@tanstack/react-query'

export const useUsageRecordDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['usage-record-detail', id],
    queryFn: () => getUsageRecord(id),
    enabled: !!id,
  })

  return data
}
