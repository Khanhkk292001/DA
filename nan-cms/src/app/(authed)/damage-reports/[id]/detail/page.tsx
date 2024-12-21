import { DamageReportDetail } from '@/features/damage-reports/views/DamageReportDetail'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <DamageReportDetail />
    </TableProvider>
  )
}
