import { deleteDiscount } from '@/libs/api/discount'
import { useMutation } from '@tanstack/react-query'

export const useDeleteDiscount = () => {
  const { mutate } = useMutation({
    mutationFn: deleteDiscount,
  })

  return {
    deleteDiscount: mutate,
  }
}
