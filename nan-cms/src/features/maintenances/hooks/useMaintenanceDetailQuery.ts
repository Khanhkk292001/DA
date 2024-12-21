import { getMaintenanceDetail } from '@/libs/api/maintenance'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MaintenanceDetailResponseType, QueryInputMaintenanceDetailType } from '../type'

export const useMaintenanceDetailQuery = (maintenanceId: string) => {
  const { sortOptions } = useTableContext<
    MaintenanceDetailResponseType,
    QueryInputMaintenanceDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['maintenance-detail', maintenanceId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getMaintenanceDetail({ maintenanceId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
