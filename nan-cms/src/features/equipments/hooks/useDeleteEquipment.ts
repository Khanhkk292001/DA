import { deleteEquipment } from '@/libs/api/equipments'
import { useMutation } from '@tanstack/react-query'

export const useDeleteEquipment = () => {
  const { mutate } = useMutation({
    mutationFn: deleteEquipment,
  })

  return {
    deleteEquipment: mutate,
  }
}
