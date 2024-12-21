import { DamageReportFilter } from '@/features/damage-reports/views/DamageReportFilter'
import { DamageReportList } from '@/features/damage-reports/views/DamageReportList'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <DamageReportFilter />
      <DamageReportList />
    </TableProvider>
  )
}
