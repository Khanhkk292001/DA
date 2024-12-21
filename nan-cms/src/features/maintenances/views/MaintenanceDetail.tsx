'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteMaintenance, useMaintenanceDetailQuery } from '../hooks'

const MaintenanceDetail = () => {
  const { maintenancesId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteMaintenance } = useDeleteMaintenance()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteMaintenance = () => {
    deleteMaintenance(maintenancesId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/maintenances')
      },
    })
  }

  const { data, isLoading } = useMaintenanceDetailQuery(maintenancesId as string)

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
          <DetailItem
            label="Ngày bảo trì"
            value={formatDate(data?.maintenanceDate as string)}
            isPending={isLoading}
          />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            label="Chi phí bảo trì"
            value={formatCurrency(data?.maintenanceCost)}
            isPending={isLoading}
          />
          <DetailItem
            label="Trạng thái"
            value={data?.status === 'pending' ? 'Đang chờ' : 'Hoàn thành'}
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
        handleSubmit={handleDeleteMaintenance}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa thông tin bảo trì này?"
        title="Xóa bảo trì"
      />
    </Stack>
  )
}

export { MaintenanceDetail }
