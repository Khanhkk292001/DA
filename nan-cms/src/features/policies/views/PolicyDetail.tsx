'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeletePolicy, usePolicyDetailQuery } from '../hooks'

const PolicyDetail = () => {
  const { policiesId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deletePolicy } = useDeletePolicy()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeletePolicy = () => {
    deletePolicy(policiesId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá chính sách thành công', { variant: 'success' })
        router.push('/policies')
      },
    })
  }

  const { data, isLoading } = usePolicyDetailQuery(policiesId as string)

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết" editPath="edit" deleteFunction={handleOpenModal} />{' '}
      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Mô tả chính sách" value={data?.description} isPending={isLoading} />
          <DetailItem label="Tỷ lệ đặt cọc" value={`${data?.depositRate}%`} isPending={isLoading} />
          <DetailItem
            label="Phí hỏng hóc"
            value={formatCurrency(data?.damageProcessingFee)}
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
        handleSubmit={handleDeletePolicy}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa chính sách này?"
        title="Xóa Chính Sách"
      />
    </Stack>
  )
}

export { PolicyDetail }
