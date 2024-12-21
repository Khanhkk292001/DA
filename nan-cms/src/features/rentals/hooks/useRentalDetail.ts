import { getRental } from '@/libs/api/rentals'
import { useQuery } from '@tanstack/react-query'

export const useRentalDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['rental-detail', id],
    queryFn: () => getRental(id),
    enabled: !!id,
  })

  return data
}
