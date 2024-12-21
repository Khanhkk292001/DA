import { getRepairRecordValueLabels } from '@/libs/api/repair-records'
import { useQuery } from '@tanstack/react-query'

export const useRepairRecordValueLabel = () => {
  const data = useQuery({
    queryKey: ['repair-record-value-label'],
    queryFn: getRepairRecordValueLabels,
  })

  return data
}
