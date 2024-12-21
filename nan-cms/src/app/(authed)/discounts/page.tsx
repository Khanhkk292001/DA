import { DiscountFilter } from '@/features/discounts/views/DiscountFilter'
import { DiscountList } from '@/features/discounts/views/DiscountList'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <DiscountFilter />
      <DiscountList />
    </TableProvider>
  )
}
