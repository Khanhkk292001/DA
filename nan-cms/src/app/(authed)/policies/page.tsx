import { PolicyFilter, PolicyList } from '@/features/policies'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <PolicyFilter />
      <PolicyList />
    </TableProvider>
  )
}
