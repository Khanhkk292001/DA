import { getListEquipmentsPackage } from '@/libs/api/equipments-package'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EquipmentPackageSearchInputType, EquipmentPackageType } from '../type'

export const useEquipmentPackagesListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    EquipmentPackageType,
    EquipmentPackageSearchInputType
  >()
  const { page, limit, name } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['equipment-package-list', page, name, limit, sort_by, column],
    queryFn: () => getListEquipmentsPackage({ ...input, name, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
