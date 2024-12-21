import { getListEquipments } from '@/libs/api/equipments'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EquipmentSearchInputType, EquipmentType } from '../type'

export const useEquipmentListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    EquipmentType,
    EquipmentSearchInputType
  >()
  const { page, limit, name } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['equipments-list', page, name, limit, sort_by, column],
    queryFn: () => getListEquipments({ ...input, name, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
