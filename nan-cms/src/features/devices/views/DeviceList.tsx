'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useDeviceListQuery } from '../hooks'
import { DeviceType } from '../type'

const DeviceList = () => {
  const { tableData, totalPages } = useDeviceListQuery()
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

  const columns: ColumnDef<DeviceType>[] = [
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
      header: 'Tên thiết bị',
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
      header: 'Mô tả',
      accessorKey: 'description',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
        },
      },
    },
    {
      header: 'Hình ảnh',
      accessorKey: 'image',
      cell: ({ row }) => (
        <img src={row.original.image} alt="device" style={{ width: 50, height: 50 }} />
      ),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
          textAlign: 'left',
        },
      },
    },
    {
      header: 'Giá theo ngày',
      accessorKey: 'priceDay',
      cell: ({ row }) => formatCurrency(row.original.priceDay),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Giá theo tuần',
      accessorKey: 'priceWeek',
      cell: ({ row }) => formatCurrency(row.original.priceWeek),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Giá theo tháng',
      accessorKey: 'priceMonth',
      cell: ({ row }) => formatCurrency(row.original.priceMonth),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
      cell: ({ row }) => row.original.status,
      meta: {
        headStyle: {
          // padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 120,
          textAlign: 'right',
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
          router.push(`/devices/${id}/detail`)
        },
      }}
    />
  )
}

export { DeviceList }
