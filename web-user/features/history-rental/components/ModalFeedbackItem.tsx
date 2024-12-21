'use client'

import { Input } from '@/libs/components/Form'
import { ModalCustom } from '@/libs/components/Modal'
import { useGetMe } from '@/libs/hooks'
import { getFeedbackByEquipmentIdOfPackageId } from '@/service/product.service'
import { feedbackItem } from '@/service/rental.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, FormHelperText, Rating, Stack, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FeedbackInputType, FeedbackItemInputSchema, FeedbackItemInputType } from '../type'

interface ModalReportProps {
  open: boolean
  handleClose: () => void
  rentalId: string
  equipmentId?: string
  packageId?: string
}

export const ModalFeedbackItem: React.FC<ModalReportProps> = ({
  handleClose,
  open,
  rentalId,
  equipmentId,
  packageId,
}) => {
  const { data: meData } = useGetMe()
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackItemInputType>({
    defaultValues: {
      comment: '',
      rentalItemId: rentalId,
      rating: 0,
      userId: meData.id,
    },
    resolver: zodResolver(FeedbackItemInputSchema),
  })

  const { mutate } = useMutation({
    mutationFn: feedbackItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews-items', equipmentId, packageId],
      })
      toast.success('Đánh giá thành công')
      reset()
    },
    onError: () => {
      toast.error('Đánh giá thất bại')
    },
  })

  const onSubmit: SubmitHandler<FeedbackInputType> = (data) => {
    if (meData.id) {
      mutate({
        ...data,
        userId: meData.id,
      })
    }
  }

  const { data: reviews } = useQuery({
    queryKey: ['reviews-items', equipmentId, packageId],
    queryFn: () =>
      getFeedbackByEquipmentIdOfPackageId({
        equipmentId,
        packageId,
      }),
    enabled: open,
  })

  return (
    <ModalCustom onClose={handleClose} open={open}>
      <Stack gap={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Hiển thị danh sách đánh giá */}
        <Stack gap={2} maxHeight="400px" overflow="auto">
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
                  {/* Tên người bình luận */}
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Tên người đánh giá: {review.user.name}
                  </Typography>
                  {/* Bình luận của người dùng */}
                  <strong>{review.comment}</strong>
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
                      <span style={{ fontSize: '0.875rem', color: '#333' }}>{review.adminResponse}</span>
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>
                        Ngày phản hồi: {review.replyDate ? new Date(review.replyDate).toLocaleDateString('vi-VN') : '-'}
                      </span>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            ))}
        </Stack>

        {/* Form thêm đánh giá */}
        <Stack direction="column" alignItems="center" gap={2} border="1px solid #ddd" p={2} borderRadius={2}>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.rating)} fullWidth>
                {/* Nếu có lỗi, sẽ hiển thị thông báo lỗi */}
                <Rating {...field} size="large" onChange={(_, newValue) => field.onChange(newValue)} />
                {errors.rating && <FormHelperText>{errors.rating.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Input control={control} label="Nội dung" name="comment" fullWidth />
        </Stack>

        <Button
          sx={{
            fontWeight: 700,
            flex: 1,
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: 0,
          }}
          type="submit"
        >
          Đánh giá
        </Button>
      </Stack>
    </ModalCustom>
  )
}
