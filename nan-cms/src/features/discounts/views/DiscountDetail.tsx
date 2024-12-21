'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteDiscount, useDiscountDetailQuery } from '../hooks'

const DiscountDetail = () => {
  const { discountsId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteDiscount } = useDeleteDiscount()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteDiscount = () => {
    deleteDiscount(discountsId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/discounts')
      },
    })
  }

  const { data, isLoading } = useDiscountDetailQuery(discountsId as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết giảm giá" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
      <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Mã giảm giá" value={data?.code} isPending={isLoading} />
          <DetailItem label="Tỷ lệ giảm giá" value={data?.discountRate} isPending={isLoading} />
          <DetailItem
            label="Ngày hiệu lực từ"
            value={formatDate(data?.validFrom as string)}
            isPending={isLoading}
          />
          <DetailItem
            label="Ngày hết hiệu lực"
            value={formatDate(data?.validTo as string)}
            isPending={isLoading}
          />
          <DetailItem label="Sử dụng tối đa" value={data?.maxUsage} isPending={isLoading} />
          <DetailItem label="Số lần đã sử dụng" value={data?.currentUsage} isPending={isLoading} />
          <DetailItem label="Trạng thái" value={data?.isActive ? 'Kích hoạt' : 'Ngừng kích hoạt'} isPending={isLoading} />
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
        handleSubmit={handleDeleteDiscount}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa mã giảm giá này?"
        title="Xóa mã giảm giá"
      />
    </Stack>
  )
}

export { DiscountDetail }
