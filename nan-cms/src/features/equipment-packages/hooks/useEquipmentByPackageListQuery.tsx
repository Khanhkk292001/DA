import { EquipmentSearchInputType, EquipmentType } from '@/features/equipments'
import { getListEquipmentsByPackage } from '@/libs/api/equipments-package'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export const useEquipmentByPackageListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    EquipmentType,
    EquipmentSearchInputType
  >()
  const { page, limit, name } = input
  const { sort_by, column } = sortOptions || {}
  const { packageId } = useParams()

  const data = useQuery({
    queryKey: ['equipments-list', page, name, limit, sort_by, column],
    queryFn: () =>
      getListEquipmentsByPackage(String(packageId), { ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
