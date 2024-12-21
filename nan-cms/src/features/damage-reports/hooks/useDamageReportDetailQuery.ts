import { getDamageReportDetail } from '@/libs/api/damage-reports'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { DamageReportDetailResponseType, QueryInputDamageReportDetailType } from '../type'

export const useDamageReportDetailQuery = (damageReportId: string) => {
  const { sortOptions } = useTableContext<
    DamageReportDetailResponseType,
    QueryInputDamageReportDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['damage-report-detail', damageReportId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getDamageReportDetail({ damageReportId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
