import { deleteCategory } from '@/libs/api/categories'
import { useMutation } from '@tanstack/react-query'

export const useDeleteCategory = () => {
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
  })

  return {
    deleteCategory: mutate,
  }
}
