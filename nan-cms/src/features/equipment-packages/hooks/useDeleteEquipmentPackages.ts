import { deleteEquipmentPackage } from '@/libs/api/equipments-package'
import { useMutation } from '@tanstack/react-query'

export const useDeleteEquipmentPackages = () => {
  const { mutate } = useMutation({
    mutationFn: deleteEquipmentPackage,
  })

  return {
    deleteEquipmentPackage: mutate,
  }
}
