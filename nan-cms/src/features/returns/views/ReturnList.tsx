'use client'

import { ReactTable } from '@/libs/components/Table'
import { Chip } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useReturnListQuery } from '../hooks'
import { ReturnType } from '../type'

const ReturnList = () => {
  const router = useRouter()
  const [isFullyReturned, setIsFullyReturned] = useState<string>('all')
  const { tableData, totalPages } = useReturnListQuery(isFullyReturned)

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<ReturnType>[] = [
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
      header: 'Mã thuê',
      accessorKey: 'rentalId',
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
      header: () => (
        <div>
          <select
            value={isFullyReturned}
            onChange={(e) => {
              setIsFullyReturned(e.target.value)
            }}
            style={{
              marginLeft: '8px',
              padding: '4px',
              fontSize: '14px',
            }}
          >
            <option value="all">Tất cả</option>
            <option value="1">Đã trả đầy đủ</option>
            <option value="0">Chưa trả đầy đủ</option>
          </select>
        </div>
      ),
      accessorKey: 'isFullyReturned',
      meta: {
        headStyle: {
          // padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
      cell: ({ row }) => {
        return (
          <Chip
            label={row?.original?.isFullyReturned ? 'Đã trả đầy đủ' : 'Chưa trả đầy đủ'}
            variant="outlined"
            size="small"
          />
        )
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
          router.push(`/returns/${id}/detail`)
        },
      }}
    />
  )
}

export { ReturnList }
