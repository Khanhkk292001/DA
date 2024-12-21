import { RepairRecordDetail } from '@/features/repair-records'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <RepairRecordDetail />
    </TableProvider>
  )
}
