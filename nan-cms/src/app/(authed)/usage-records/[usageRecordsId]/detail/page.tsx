import { UsageRecordDetail } from '@/features/usage-records'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <UsageRecordDetail />
    </TableProvider>
  )
}
