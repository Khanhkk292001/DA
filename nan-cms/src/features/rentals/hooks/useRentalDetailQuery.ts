import { getRentalDetail } from '@/libs/api/rentals'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { QueryInputRentalDetailType, RentalDetailResponseType } from '../type'

export const useRentalDetailQuery = (rentalId: string) => {
  const { sortOptions } = useTableContext<RentalDetailResponseType, QueryInputRentalDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['rental-detail', rentalId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getRentalDetail({ rentalId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
