import { MaintenanceFilter, MaintenanceList } from '@/features/maintenances'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <MaintenanceFilter />
      <MaintenanceList />
    </TableProvider>
  )
}
