import { EquipmentFilter, EquipmentList } from '@/features/equipments'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <EquipmentFilter />
      <EquipmentList />
    </TableProvider>
  )
}
