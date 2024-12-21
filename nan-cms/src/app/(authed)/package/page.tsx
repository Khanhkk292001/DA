import { EquipmentPackageFilter, EquipmentPackageList } from '@/features/equipment-packages'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <EquipmentPackageFilter />
      <EquipmentPackageList />
    </TableProvider>
  )
}
