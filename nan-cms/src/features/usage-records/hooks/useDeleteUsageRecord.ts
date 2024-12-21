import { deleteUsageRecord } from '@/libs/api/usage-records'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUsageRecord = () => {
  const { mutate } = useMutation({
    mutationFn: deleteUsageRecord,
  })

  return {
    deleteUsageRecord: mutate,
  }
}
