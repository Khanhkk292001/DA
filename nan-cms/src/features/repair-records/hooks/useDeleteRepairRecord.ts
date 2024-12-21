import { deleteRepairRecord } from '@/libs/api/repair-records'
import { useMutation } from '@tanstack/react-query'

export const useDeleteRepairRecord = () => {
  const { mutate } = useMutation({
    mutationFn: deleteRepairRecord,
  })

  return {
    deleteRepairRecord: mutate,
  }
}
