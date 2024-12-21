'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useDiscountListQuery } from '../hooks'
import { DiscountType } from '../type'

const DiscountList = () => {
  const { tableData, totalPages } = useDiscountListQuery()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<DiscountType>[] = [
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
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Mã giảm giá',
      accessorKey: 'code',
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
      header: 'Tỷ lệ giảm giá',
      accessorKey: 'discountRate',
      cell: ({ row }) => `${row.original.discountRate}%`,
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
      header: 'Hiệu lực từ',
      accessorKey: 'validFrom',
      cell: ({ row }) => new Date(row.original.validFrom).toLocaleDateString('vi-VN'),
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
      header: 'Hiệu lực đến',
      accessorKey: 'validTo',
      cell: ({ row }) => new Date(row.original.validTo).toLocaleDateString('vi-VN'),
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
      header: 'Sử dụng tối đa',
      accessorKey: 'maxUsage',
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
      header: 'Số lần đã sử dụng',
      accessorKey: 'currentUsage',
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
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      next={totalPages}
      action={{
        disabledDetail: false,
        onDetail: (id) => {
          router.push(`/discounts/${id}/detail`)
        },
      }}
    />
  )
}

export { DiscountList }
