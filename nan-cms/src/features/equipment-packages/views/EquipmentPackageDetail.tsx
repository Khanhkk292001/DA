'use client'

import { DetailItem } from '@/features/article/components'
import { getFeedbackByEquipmentIdOfPackageId } from '@/features/equipments'
import { ModalFeedback } from '@/features/rentals/views/ModalFeedback'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import request from '@/libs/config/axios'
import { formatDate } from '@/utils/format'
import {
  Avatar,
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteEquipmentPackages, useEquipmentPackagesDetailQuery } from '../hooks'
import { EquipmentByPackageList } from './EquipmentByPackageList'

const EquipmentPackageDetail = () => {
  const { packageId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteEquipmentPackage } = useDeleteEquipmentPackages()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteEquipmentPackage = () => {
    deleteEquipmentPackage(packageId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' })
        router.push('/package')
      },
      onError: () => {
        enqueueSnackbar('Không thể xoá do gói đang được thuê', { variant: 'error' })
      },
    })
  }

  const { data, isLoading } = useEquipmentPackagesDetailQuery(packageId as string)

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  const { data: reviews } = useQuery({
    queryKey: ['reviews-items-package', packageId],
    queryFn: () =>
      getFeedbackByEquipmentIdOfPackageId({
        packageId: String(packageId),
      }),
    enabled: !!packageId,
  })

  const [feedbackOpen, setOpenFeedback] = useState(false)
  const [feedbackId, setFeedbackId] = useState('')
  const onClose = () => {
    setOpenFeedback(false)
    setFeedbackId('')
  }

  const { data: countRental } = useQuery({
    queryKey: ['rental-count-package', packageId],
    queryFn: async () => {
      const response = await request.get(`/rentals/items/equipment/${packageId}`)

      return response.data
    },
  })

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Tên gói" value={data?.name} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            label="Giá gói"
            value={formatCurrency(data?.basePrice)}
            isPending={isLoading}
          />
          <DetailItem
            label="Giá cho thuê"
            value={formatCurrency(data?.rentalPrice)}
            isPending={isLoading}
          />
          <DetailItem
            label="Ảnh"
            image={{ src: data?.image ?? '', alt: data?.name }}
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

          <DetailItem
            label="
            Số lần cho thuê"
            value={countRental?.rentalCount}
            isPending={isLoading}
          />
        </Stack>
      </Box>

      <Stack bgcolor="white" p={2} spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Đánh giá sản phẩm
        </Typography>

        <Stack gap={2} maxHeight="400px" overflow="auto" mb={10}>
          {reviews &&
            reviews.map((review) => (
              <Stack
                key={review.id}
                direction="row"
                alignItems="center"
                gap={2}
                sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}
              >
                {/* Hiển thị số sao */}
                <Rating value={review.rating} readOnly size="small" />
                <Stack>
                  {/* Bình luận của người dùng */}
                  <p style={{ padding: 0, margin: 0 }}>Tên người đánh giá: {review.user.name}</p>
                  <p style={{ padding: 0, margin: 0 }}>
                    Nội dung: <strong>{review.comment}</strong>
                  </p>
                  <span style={{ fontSize: '0.875rem', color: '#666' }}>
                    Ngày: {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                  </span>

                  {/* Phản hồi từ admin (nếu có) */}
                  {review.adminResponse && (
                    <Stack
                      sx={{
                        mt: 1,
                        p: 1,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: '#f9f9f9',
                        width: '100%',
                      }}
                    >
                      <strong>Phản hồi từ admin:</strong>
                      <span style={{ fontSize: '0.875rem', color: '#333' }}>
                        {review.adminResponse}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>
                        Ngày phản hồi:{' '}
                        {review.replyDate
                          ? new Date(review.replyDate).toLocaleDateString('vi-VN')
                          : '-'}
                      </span>
                    </Stack>
                  )}
                </Stack>
                {!review.adminResponse && (
                  <Button
                    onClick={() => {
                      setOpenFeedback(true)
                      setFeedbackId(review.id)
                    }}
                  >
                    Phản hồi
                  </Button>
                )}
              </Stack>
            ))}

          <ModalFeedback handleClose={onClose} open={feedbackOpen} feedbackId={feedbackId} />
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Thống kê số lần thuê
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Hình đại diện</strong>
                </TableCell>
                <TableCell>
                  <strong>Tên người dùng</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Số điện thoại</strong>
                </TableCell>
                <TableCell>
                  <strong>Ngày bắt đầu</strong>
                </TableCell>
                <TableCell>
                  <strong>Ngày kết thúc</strong>
                </TableCell>
                <TableCell>
                  <strong>Địa chỉ</strong>
                </TableCell>
                <TableCell>
                  <strong>Trạng thái</strong>
                </TableCell>
                <TableCell>
                  <strong>Tổng tiền</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countRental &&
                countRental?.data?.map((row: any) => (
                  <TableRow key={row.id}>
                    {/* Hình đại diện */}
                    <TableCell>
                      <Avatar src={row.user.avatar} alt={row.user.name} />
                    </TableCell>
                    {/* Tên người dùng */}
                    <TableCell>
                      <Typography>{row.user.name}</Typography>
                    </TableCell>
                    {/* Email */}
                    <TableCell>{row.user.email}</TableCell>
                    {/* Số điện thoại */}
                    <TableCell>{row.user.phoneNumber}</TableCell>
                    {/* Ngày bắt đầu */}
                    <TableCell>{format(new Date(row.startDate), 'dd/MM/yyyy HH:mm')}</TableCell>
                    {/* Ngày kết thúc */}
                    <TableCell>{format(new Date(row.endDate), 'dd/MM/yyyy HH:mm')}</TableCell>
                    {/* Địa chỉ */}
                    <TableCell>{row.address}</TableCell>
                    {/* Trạng thái */}
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            row.status === 'pending'
                              ? 'orange'
                              : row.status === 'completed'
                                ? 'green'
                                : 'red',
                        }}
                      >
                        {row.status}
                      </Typography>
                    </TableCell>
                    {/* Tổng tiền */}
                    <TableCell>{row.totalAmount.toLocaleString('vi-VN')} VNĐ</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Box>
        <Typography fontSize={16} color={'#03396c'} mb={3}>
          Thiết bị có trong gói
        </Typography>
        <EquipmentByPackageList />
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteEquipmentPackage}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa gói thiết bị này?"
        title="Xóa gói thiết bị"
      />
    </Stack>
  )
}

export { EquipmentPackageDetail }
