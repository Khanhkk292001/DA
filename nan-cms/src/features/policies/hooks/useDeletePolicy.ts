import { deletePolicy } from '@/libs/api/policy'
import { useMutation } from '@tanstack/react-query'

export const useDeletePolicy = () => {
  const { mutate } = useMutation({
    mutationFn: deletePolicy,
  })

  return {
    deletePolicy: mutate,
  }
}
