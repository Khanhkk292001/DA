import { getListDamageReports } from '@/libs/api/damage-reports'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { DamageReportSearchInputType, DamageReportType } from '../type'

export const useDamageReportListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    DamageReportType,
    DamageReportSearchInputType
  >()

  const { page, limit, status } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['damage-report-list', page, status, limit, sort_by, column],
    queryFn: () => getListDamageReports({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
