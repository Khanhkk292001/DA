import { UserFilter, UserList } from '@/features/user'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <UserFilter />
      <UserList />
    </TableProvider>
  )
}
