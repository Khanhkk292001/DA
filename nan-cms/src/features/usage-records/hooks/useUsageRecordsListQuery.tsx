import { getListUsageRecords } from '@/libs/api/usage-records'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { UsageRecordSearchInputType, UsageRecordType } from '../type'

export const useUsageRecordsListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    UsageRecordType,
    UsageRecordSearchInputType
  >()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['usage-record-list', page, filter, limit, sort_by, column],
    queryFn: () => getListUsageRecords({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
