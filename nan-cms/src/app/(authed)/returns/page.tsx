import { ReturnFilter, ReturnList } from '@/features/returns'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <ReturnFilter />
      <ReturnList />
    </TableProvider>
  )
}
