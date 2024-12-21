import { getListMaintenances } from '@/libs/api/maintenance'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MaintenanceSearchInputType, MaintenanceType } from '../type'

export const useMaintenanceListQuery = (status: string) => {
  const { input, getTableData, sortOptions } = useTableContext<
    MaintenanceType,
    MaintenanceSearchInputType
  >()
  const { page, limit } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['maintenances-list', page, status, limit, sort_by, column],
    queryFn: () => getListMaintenances({ ...input, limit, status, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
