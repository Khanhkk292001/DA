'use client'

import { ReactTable } from '@/libs/components/Table'
import { formatDate } from '@/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useDamageReportListQuery } from '../hooks'
import { DamageReportType } from '../type'

const DamageReportList = () => {
  const { tableData, totalPages } = useDamageReportListQuery()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<DamageReportType>[] = [
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
      header: 'Mã báo cáo',
      accessorKey: 'id',
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
      header: 'Chi tiết báo cáo',
      accessorKey: 'description',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Mã thiết bị',
      accessorKey: 'equipment.id',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 500,
        },
      },
    },
    {
      header: 'Thiết bị',
      accessorKey: 'equipment.name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 500,
        },
      },
    },
    {
      header: 'Hình ảnh thiết bị hỏng',
      accessorKey: 'equipment.image',
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt="equipment"
          style={{ width: 100, height: 100, objectFit: 'cover' }}
        />
      ),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 500,
        },
      },
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'createdAt',
      cell: ({ row }) => formatDate(row.original.createdAt as string),
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 500,
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
          router.push(`/damage-reports/${id}/detail`)
        },
      }}
    />
  )
}

export { DamageReportList }
