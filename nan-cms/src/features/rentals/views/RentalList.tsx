'use client'

import { cancelRental, confirmRental } from '@/libs/api/rentals'
import { ReactTable } from '@/libs/components/Table'
import { Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useRentalListQuery } from '../hooks'
import { RentalType } from '../type'

const RentalList = () => {
  const { tableData, totalPages, refetch } = useRentalListQuery()
  const { mutate } = useMutation({
    mutationFn: confirmRental,
    onSuccess: () => {
      refetch()
      alert('Xác nhận thành công')
    },
    onError: (error) => {
      alert('Xác nhận thất bại')
    },
  })
  
  const { mutate: cancel } = useMutation({
    mutationFn: cancelRental,
    onSuccess: () => {
      refetch()
      alert('Hủy thành công')
    },
    onError: (error) => {
      alert('Hủy thất bại')
    },
  })

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  const formatDate = (date: string | Date) =>
    new Intl.DateTimeFormat('en-GB').format(new Date(date))

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<RentalType>[] = [
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
      header: 'Tên người dùng',
      accessorKey: 'user.name',
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
      header: 'Ngày bắt đầu',
      accessorKey: 'startDate',
      cell: ({ row }) => formatDate(row.original.startDate as string),
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
      header: 'Ngày kết thúc',
      accessorKey: 'endDate',
      cell: ({ row }) => formatDate(row.original.endDate as string),
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
      header: 'Tổng tiền',
      accessorKey: 'totalPrice',
      cell: ({ row }) => formatCurrency(row.original.totalAmount),
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
      header: 'Trạng thái',
      accessorKey: 'status',
      meta: {
        headStyle: {
          // padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
      cell: ({ row }) => {
        const ActionByStatus = ({
          row,
        }: {
          row: { original: { id: string; status: 'pending' | 'active' | 'confirmed' | 'canceled' } }
        }) => {
          const handleActionClick = (id: string, action: string) => {
            switch (action) {
              case 'confirm':
                mutate(id)
                break

              case 'cancel':
                cancel(id)
                break

              case 'complete':
                alert('Hoàn thành')
                break

              default:
                break
            }
          }

          switch (row.original.status) {
            case 'pending':
              return (
                <Stack direction="row" spacing={2}>
                  <Typography
                    onClick={() => handleActionClick(row.original.id, 'confirm')}
                    sx={{ cursor: 'pointer', color: 'blue' }}
                  >
                    Xác nhận
                  </Typography>
                  <Typography
                    onClick={() => handleActionClick(row.original.id, 'cancel')}
                    sx={{ cursor: 'pointer', color: 'red' }}
                  >
                    Hủy
                  </Typography>
                </Stack>
              )

            case 'confirmed':
              return (
                <Typography
                  onClick={() => handleActionClick(row.original.id, 'complete')}
                  sx={{ cursor: 'pointer', color: 'green' }}
                >
                  Đã xác nhận
                </Typography>
              )

            case 'canceled':
              return <Typography sx={{ color: 'red', fontStyle: 'italic' }}>Đã hủy</Typography>

            default:
              return null
          }
        }

        return <ActionByStatus row={row} />
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
      }}
    />
  )
}

export { RentalList }
