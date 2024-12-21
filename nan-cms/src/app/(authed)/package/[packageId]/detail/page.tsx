import { EquipmentPackageDetail } from '@/features/equipment-packages'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <EquipmentPackageDetail />
    </TableProvider>
  )
}
