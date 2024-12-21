import { getMe } from '@/service/auth.service'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = () => {
  const data = useQuery({
    queryKey: ['ME'],
    queryFn: getMe,
  })

  return data
}
