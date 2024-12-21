import { getMaintenance } from '@/libs/api/maintenance'
import { useQuery } from '@tanstack/react-query'

export const useMaintenanceDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['maintenance-detail', id],
    queryFn: () => getMaintenance(id),
    enabled: !!id,
  })

  return data
}
