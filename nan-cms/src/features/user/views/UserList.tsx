'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUserListQuery } from '../hooks'
import { UserType } from '../type'
import { useState } from 'react'

const UserList = () => {
  const [statusIdentityDoc, setStatusIdentityDoc] = useState<string>('all')
  const { tableData, totalPages } = useUserListQuery(statusIdentityDoc)
  const router = useRouter()


  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<UserType>[] = [
    {
      header: 'STT',
      accessorFn: (row, index) => index + 1,
      meta: {
        width: 60,
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          width: 60,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '8px',
        },
      },
    },
    {
      header: 'Tên người dùng',
      accessorKey: 'name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
    },
    {
      header: 'Chứng minh thư',
      accessorKey: 'identityDoc',
      cell: ({ row }) => {
        return row.original.identityDoc ? (
          <Image src={row.original.identityDoc} alt="Chứng minh thư" width={100} height={100} />
        ) : null
      },
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
    },
    {
      header: 'Số điện thoại',
      accessorKey: 'phoneNumber',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
    },
    {
      header: 'Giới tính',
      accessorKey: 'gender',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
    },
    {
      header: () => (
        <div>
          <select
            value={statusIdentityDoc}
            onChange={(e)=>{
              setStatusIdentityDoc(e.target.value)
            }}
            style={{
              marginLeft: '8px',
              padding: '4px',
              fontSize: '14px',
            }}
          >
            <option value="all">Tất cả</option>
            <option value="verified">Đã xác thực</option>
            <option value="rejected">Chưa xác thực</option>
          </select>
        </div>
      ),
      accessorKey: 'statusIdentityDoc',
      cell: ({ row }) => {
        switch (row.original.statusIdentityDoc) {
          case 'verified':
            return 'Đã xác thực'
          case 'rejected':
            return 'Chưa xác thực'
          default:
            return 'Chưa xác thực'
        }
      },
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
    },
    {
      header: 'Quyền',
      accessorKey: 'role',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
          fontWeight: 500,
        },
      },
    },
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      next={totalPages}
      action={{
        disabledDetail: false,
        onDetail: (id) => {
          router.push(`/users/${id}/detail`)
        },
      }}
    />
  )
}

export { UserList }
