'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useCategoryDetailQuery, useDeleteCategory } from '../hooks'
import { EquipmentByCategoryList } from './EquipmentByCategoryList'

const CategoryDetail = () => {
  const { categoriesId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteCategory } = useDeleteCategory()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteCartegory = () => {
    deleteCategory(categoriesId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/categories')
      },
    })
  }

  const { data, isLoading } = useCategoryDetailQuery(categoriesId as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Tên danh mục" value={data?.name} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
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
      <Box>
        <Typography fontSize={16} color={"#03396c"} mb={3}>Thiết bị có trong danh mục</Typography>
        <EquipmentByCategoryList />
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteCartegory}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa danh mục này?"
        title="Xóa danh mục"
      />
    </Stack>
  )
}

export { CategoryDetail }
