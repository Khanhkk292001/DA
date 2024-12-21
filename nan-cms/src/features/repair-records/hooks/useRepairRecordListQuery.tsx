// hooks/useRepairRecordListQuery.ts
import { getListRepairRecords } from '@/libs/api/repair-records'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { RepairRecordSearchInputType, RepairRecordType } from '../type'

export const useRepairRecordListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    RepairRecordType,
    RepairRecordSearchInputType
  >()

  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['repairRecord-list', page, filter, limit, sort_by, column],
    queryFn: () => getListRepairRecords({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
