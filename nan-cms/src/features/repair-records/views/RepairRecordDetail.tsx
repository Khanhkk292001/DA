'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteRepairRecord, useRepairRecordDetailQuery } from '../hooks'

const RepairRecordDetail = () => {
  const { repairRecordId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteRepairRecord } = useDeleteRepairRecord()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteRepairRecord = () => {
    deleteRepairRecord(repairRecordId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/repair-records') // Chuyển hướng về danh sách sửa chữa
      },
    })
  }

  const { data, isLoading } = useRepairRecordDetailQuery(repairRecordId as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết lịch sử sửa chữa" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Thiết bị ID" value={data?.equipmentId} isPending={isLoading} />
          <DetailItem
            label="Ngày sửa chữa"
            value={formatDate(data?.repairDate as string)}
            isPending={isLoading}
          />
          <DetailItem
            label="Nguyên nhân hư hỏng"
            value={data?.failureCause}
            isPending={isLoading}
          />
          <DetailItem label="Bộ phận thay thế" value={data?.partsReplaced} isPending={isLoading} />
          <DetailItem label="Chi phí sửa chữa" value={data?.repairCost} isPending={isLoading} />
          <DetailItem
            label="Bảo hành"
            value={formatDate(data?.warranty as string)}
            isPending={isLoading}
          />
        </Stack>
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteRepairRecord}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa lịch sử sửa chữa này?"
        title="Xóa lịch sử sửa chữa"
      />
    </Stack>
  )
}

export { RepairRecordDetail }
