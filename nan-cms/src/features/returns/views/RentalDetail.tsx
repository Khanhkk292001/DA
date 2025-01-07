'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import request from '@/libs/config/axios'
import { formatDate } from '@/utils/format'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { RentalDetail as RentalDetailType, ReviewsResponse } from '../type'
import { AdminReviews } from './AdminFeddback'

const RentalDetail = () => {
  const { rentalId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['rental'],
    queryFn: async () => {
      const { data } = await request.get<RentalDetailType>(`/rentals/get-by/${rentalId}`)
      return data.data
    },
  })

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryFn: async () => {
      const response = await request.get<ReviewsResponse>(`feedbacks/rental/${rentalId}`)

      return response.data.data
    },
    queryKey: ['Rental', rentalId],
  })

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      : ''

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết" />
      <Box>
        <Stack spacing={4}>
          <Typography variant="h4" gutterBottom>
            Chi tiết đơn thuê
          </Typography>

          <Box>
            <Stack spacing={2}>
              <DetailItem label="ID" value={data?.id} isPending={isLoading} />
              <DetailItem
                label="Tổng tiền"
                value={formatCurrency(data?.totalAmount)}
                isPending={isLoading}
              />
              <DetailItem
                label="Ngày bắt đầu"
                value={formatDate(data?.startDate as string)}
                isPending={isLoading}
              />
              <DetailItem
                label="Ngày kết thúc"
                value={formatDate(data?.endDate as string)}
                isPending={isLoading}
              />
              <DetailItem label="Trạng thái" value={data?.status} isPending={isLoading} />
              <DetailItem
                label="Địa chỉ"
                value={data?.address || 'Không có thông tin'}
                isPending={isLoading}
              />

              {/* Hiển thị thông tin người dùng */}
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Thông tin người thuê
              </Typography>
              <DetailItem label="Tên người dùng" value={data?.user.name} isPending={isLoading} />
              <DetailItem label="Email" value={data?.user.email} isPending={isLoading} />
              <DetailItem
                label="Số điện thoại"
                value={data?.user.phoneNumber}
                isPending={isLoading}
              />
              <DetailItem
                label="Ngày sinh"
                value={formatDate(data?.user.dateOfBirth)}
                isPending={isLoading}
              />

              {/* Hiển thị các thiết bị trong đơn thuê */}
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Các thiết bị thuê
              </Typography>
              <Grid container spacing={2}>
                {data?.items.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{item?.equipment?.name ?? ''}</Typography>
                        <img
                          src={
                            item.equipment?.image ??
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2NAjCcjjk7ac57mKCQvgWVTmP0ysxnzQnQ&s'
                          }
                          alt={item?.equipment?.name}
                          style={{ width: '100%', height: '400px', objectFit: 'contain' }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {item.equipment?.description}
                        </Typography>
                        <Typography variant="body2">Số lượng: {item?.quantity}</Typography>
                        <Typography variant="body2">
                          Thời gian thuê: {item?.durationValue} {item?.durationType} (s)
                        </Typography>
                        <Typography variant="body2">Giá: {formatCurrency(item.price)}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
            <AdminReviews reviews={reviews} isLoading={reviewsLoading} />
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}

export { RentalDetail }
