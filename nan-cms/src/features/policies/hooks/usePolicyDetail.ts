import { getPolicy } from '@/libs/api/policy'
import { useQuery } from '@tanstack/react-query'

export const usePolicyDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['policy-detail', id],
    queryFn: () => getPolicy(id),
    enabled: !!id,
  })

  return data
}
