import { getRepairRecordDetail } from '@/libs/api/repair-records'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { QueryInputRepairRecordDetailType, RepairRecordDetailResponseType } from '../type'

export const useRepairRecordDetailQuery = (repairRecordId: string) => {
  const { sortOptions } = useTableContext<
    RepairRecordDetailResponseType,
    QueryInputRepairRecordDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['repair-record-detail', repairRecordId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getRepairRecordDetail({ repairRecordId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
