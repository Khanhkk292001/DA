import { DiscountDetail } from '@/features/discounts'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <DiscountDetail />
    </TableProvider>
  )
}
