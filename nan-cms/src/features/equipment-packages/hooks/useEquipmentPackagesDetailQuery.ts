import { getEquipmentPackageDetail } from '@/libs/api/equipments-package'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EquipmentPackageDetailResponseType, QueryInputEquipmentPackageDetailType } from '../type'

export const useEquipmentPackagesDetailQuery = (packageId: string) => {
  const { sortOptions } = useTableContext<
    EquipmentPackageDetailResponseType,
    QueryInputEquipmentPackageDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['equipment-package-detail', packageId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getEquipmentPackageDetail({ packageId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
