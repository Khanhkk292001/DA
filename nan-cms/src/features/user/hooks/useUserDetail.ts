import { getUser } from '@/libs/api/user'
import { useQuery } from '@tanstack/react-query'

export const useUserDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  })

  return data
}
