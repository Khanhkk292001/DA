import { PolicyDetail } from '@/features/policies'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <PolicyDetail />
    </TableProvider>
  )
}
