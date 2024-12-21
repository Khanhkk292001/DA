'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteUsageRecord, useUsageRecordDetailQuery } from '../hooks'

const UsageRecordDetail = () => {
  const { usageRecordId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteUsageRecord } = useDeleteUsageRecord()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteUsageRecord = () => {
    deleteUsageRecord(usageRecordId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/usage-records')
      },
    })
  }

  const { data, isLoading } = useUsageRecordDetailQuery(usageRecordId as string)

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="ID Thiết bị" value={data?.equipmentId} isPending={isLoading} />
          <DetailItem label="ID Thuê" value={data?.rentalId} isPending={isLoading} />
          <DetailItem
            label="Ngày thuê"
            value={formatDate(data?.rentalDate as string)}
            isPending={isLoading}
          />
          <DetailItem
            label="Ngày trả"
            value={data?.returnDate ? formatDate(data?.returnDate as string) : 'Chưa trả'}
            isPending={isLoading}
          />
          <DetailItem
            label="Thời gian sử dụng (giờ)"
            value={data?.usageDuration}
            isPending={isLoading}
          />
          <DetailItem label="Sự cố" value={data?.incidents} isPending={isLoading} />
          <DetailItem
            label="Ngày tạo"
            value={formatDate(data?.createdAt as string)}
            isPending={isLoading}
          />
          <DetailItem
            label="Ngày cập nhật"
            value={formatDate(data?.updatedAt as string)}
            isPending={isLoading}
          />
        </Stack>
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteUsageRecord}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa bản ghi thuê thiết bị này?"
        title="Xóa bản ghi thuê thiết bị"
      />
    </Stack>
  )
}

export { UsageRecordDetail }
