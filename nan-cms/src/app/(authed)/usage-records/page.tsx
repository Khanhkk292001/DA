import { UsageRecordFilter, UsageRecordsList } from '@/features/usage-records'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <UsageRecordFilter />
      <UsageRecordsList />
    </TableProvider>
  )
}
