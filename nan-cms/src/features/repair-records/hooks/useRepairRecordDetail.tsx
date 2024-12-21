import { getRepairRecord } from '@/libs/api/repair-records'
import { useQuery } from '@tanstack/react-query'

export const useRepairRecordDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['repair-record-detail', id],
    queryFn: () => getRepairRecord(id),
    enabled: !!id,
  })

  return data
}
