import { deleteUser } from '@/libs/api/user'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
  const { mutate } = useMutation({
    mutationFn: deleteUser,
  })

  return {
    deleteUser: mutate,
  }
}
