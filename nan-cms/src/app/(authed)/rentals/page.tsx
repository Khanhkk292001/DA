import { RentalFilter, RentalList } from '@/features/rentals'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <RentalFilter />
      <RentalList />
    </TableProvider>
  )
}
