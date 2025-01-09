import { getReturn } from '@/libs/api/returns'
import { useQuery } from '@tanstack/react-query'

export const useReturnDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['equipment-detail', id],
    queryFn: () => getReturn(id),
    enabled: !!id,
  })

  return data
}
