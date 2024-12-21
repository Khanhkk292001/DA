import { getUserDetail } from '@/libs/api/user'
import { useQuery } from '@tanstack/react-query'

export const useUserDetailQuery = (userId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserDetail({ userId }),
  })

  return { data, error, isLoading }
}
