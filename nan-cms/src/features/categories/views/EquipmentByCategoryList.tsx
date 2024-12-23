'use client'

import { EquipmentType } from '@/features/equipments'
import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEquipmentByCategoryListQuery } from '../hooks/useEquipmentByCategoryListQuery'

const EquipmentByCategoryList = () => {
  const { tableData, totalPages } = useEquipmentByCategoryListQuery()
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

  const columns: ColumnDef<EquipmentType>[] = [
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
      header: 'Giá mua sản phẩm',
      accessorKey: 'basePrice',
      cell: ({ row }) => formatCurrency(row.original.basePrice),
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
      header: 'Giá thuê ',
      accessorKey: 'rentalPrice',
      cell: ({ row }) => formatCurrency(row.original.rentalPrice),
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
      header: 'Số lượng',
      accessorKey: 'stock',
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
          router.push(`/equipments/${id}/detail`)
        },
      }}
    />
  )
}

export { EquipmentByCategoryList }
