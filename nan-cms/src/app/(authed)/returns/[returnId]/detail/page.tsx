import { ReturnDetail } from '@/features/returns/views/ReturnDetail'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <ReturnDetail />
    </TableProvider>
  )
}
