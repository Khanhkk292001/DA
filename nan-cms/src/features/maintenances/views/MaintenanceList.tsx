'use client'

import { ReactTable } from '@/libs/components/Table'
import { formatDate } from '@/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMaintenanceListQuery } from '../hooks/useMaintenanceListQuery'
import { MaintenanceType } from '../type'

const MaintenanceList = () => {
  const [status, setStatus] = useState<string>('all')
  const { tableData, totalPages } = useMaintenanceListQuery(status)
  const router = useRouter()

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<MaintenanceType>[] = [
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
      header: 'Ngày bảo trì',
      accessorKey: 'maintenanceDate',
      meta: {
        width: 150,
        headStyle: { padding: '0 16px' },
        cellStyle: {
          ...commonCellStyle,
        },
      },
      cell: ({ row }) => {
        return <span>{formatDate(row.original.maintenanceDate)}</span>
      },
    },
    {
      header: 'Mã vạch',
      accessorKey: 'code',
      meta: {
        width: 150,
        headStyle: { padding: '0 16px' },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Mô tả',
      accessorKey: 'description',
      meta: {
        width: 250,
        headStyle: { padding: '0 16px' },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: () => (
        <div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
            }}
            style={{
              marginLeft: '8px',
              padding: '4px',
              fontSize: '14px',
            }}
          >
            <option value="all">Tất cả</option>
            <option value="completed">Hoàn thành</option>
            <option value="pending">Đang chờ</option>
          </select>
        </div>
      ),
      accessorKey: 'status',
      meta: {
        width: 120,
        cellStyle: {
          ...commonCellStyle,
        },
      },
      cell: ({ row }) => {
        return <span>{row.getValue('status') === 'completed' ? 'Hoàn thành' : 'Đang chờ'}</span>
      },
    },
    {
      header: 'Chi phí bảo trì',
      accessorKey: 'maintenanceCost',
      meta: {
        width: 150,
        headStyle: { padding: '0 16px' },
        cellStyle: {
          ...commonCellStyle,
        },
      },
      cell: ({ row }) => {
        return <span>{formatCurrency(row.getValue('maintenanceCost'))}</span>
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
          router.push(`/maintenances/${id}/detail`)
        },
      }}
    />
  )
}

export { MaintenanceList }
