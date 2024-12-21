import { RentalDetail } from '@/features/rentals'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <RentalDetail />
    </TableProvider>
  )
}
