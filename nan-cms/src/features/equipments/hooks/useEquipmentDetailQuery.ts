import { getEquipmentDetail } from '@/libs/api/equipments'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EquipmentDetailResponseType, QueryInputEquipmentDetailType } from '../type'

export const useEquipmentDetailQuery = (equipmentId: string) => {
  const { sortOptions } = useTableContext<
    EquipmentDetailResponseType,
    QueryInputEquipmentDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['equipment-detail', equipmentId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getEquipmentDetail({ equipmentId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
