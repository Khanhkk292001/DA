import { getEquipmentPackage } from '@/libs/api/equipments-package'
import { useQuery } from '@tanstack/react-query'

export const useEquipmentPackageDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['equipment-package-detail', id],
    queryFn: () => getEquipmentPackage(id),
    enabled: !!id,
  })

  return data
}
