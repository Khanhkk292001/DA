import { deleteReturn } from '@/libs/api/returns'
import { useMutation } from '@tanstack/react-query'

export const useDeleteReturn = () => {
  const { mutate } = useMutation({
    mutationFn: deleteReturn,
  })

  return {
    deleteReturn: mutate,
  }
}
