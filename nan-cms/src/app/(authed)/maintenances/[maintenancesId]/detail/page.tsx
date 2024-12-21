import { MaintenanceDetail } from '@/features/maintenances'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <MaintenanceDetail />
    </TableProvider>
  )
}
