import { CategoryDetail } from '@/features/categories'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <CategoryDetail />
    </TableProvider>
  )
}
