'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteReturn, useReturnDetailQuery } from '../hooks'

const ReturnDetail = () => {
  const { returnId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteReturn } = useDeleteReturn()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteReturn = () => {
    deleteReturn(returnId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xóa đơn trả thành công', { variant: 'success' })
        router.push('/returns')
      },
      onError: () => {
        enqueueSnackbar('Xóa đơn trả thiết bị không thành công', { variant: 'error' })
      },
    })
  }

  const { data, isLoading } = useReturnDetailQuery(returnId as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Mã đơn thuê" value={data?.rentalId} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            label="Trạng thái"
            value={data?.isFullyReturned ? 'Đã trả đầy đủ' : 'Chưa trả đầy đủ'}
            isPending={isLoading}
          />
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
        handleSubmit={handleDeleteReturn}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa đơn này?"
        title="Xóa đơn trả thiết bị"
      />
    </Stack>
  )
}

export { ReturnDetail }
