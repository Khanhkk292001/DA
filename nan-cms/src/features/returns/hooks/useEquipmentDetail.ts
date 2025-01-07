import { getEquipment } from '@/libs/api/equipments'
import { useQuery } from '@tanstack/react-query'

export const useEquipmentDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['equipment-detail', id],
    queryFn: () => getEquipment(id),
    enabled: !!id,
  })

  return data
}
