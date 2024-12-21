import { getDamageReport } from '@/libs/api/damage-reports'
import { useQuery } from '@tanstack/react-query'

export const useDamageReportDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['damage-report-detail', id],
    queryFn: () => getDamageReport(id),
    enabled: !!id,
  })

  return data
}
