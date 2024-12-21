import { DashboardForm } from '@/features/dashboard'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <DashboardForm />
    </TableProvider>
  )
}
