import { deleteMaintenance } from '@/libs/api/maintenance'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMaintenance = () => {
  const { mutate } = useMutation({
    mutationFn: deleteMaintenance,
  })

  return {
    deleteMaintenance: mutate,
  }
}
