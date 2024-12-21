import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { ModalFeedback } from './ModalFeedback'

const AdminReviews = ({
  reviews,
  isLoading,
}: {
  reviews: Review[] | undefined
  isLoading: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [feedbackId, setFeedbackId] = useState('')
  const onClose = () => {
    setOpen(false)
    setFeedbackId('')
  }

  return (
    <Stack spacing={2} mt={6}>
      <Typography variant="h1" gutterBottom>
        Đánh giá
      </Typography>

      {/* Hiển thị danh sách các đánh giá */}
      <Grid container spacing={3}>
        {isLoading ? (
          <Typography variant="h6">Đang tải dữ liệu...</Typography>
        ) : (
          reviews?.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6" color="primary">
                        Đánh giá của người dùng
                      </Typography>

                      {!review.adminResponse && (
                        <Button
                          onClick={() => {
                            setOpen(true)
                            setFeedbackId(review.id)
                          }}
                        >
                          Phản hồi
                        </Button>
                      )}
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Người dùng:</strong> {review.userId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Bình luận:</strong> {review.comment}
                    </Typography>

                    {/* Đánh giá sao */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        <strong>Đánh giá:</strong>
                      </Typography>
                      <Rating name="read-only" value={review.rating} readOnly />
                    </Stack>

                    {/* Trả lời từ admin (nếu có) */}
                    {review.adminResponse ? (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Trả lời từ admin:</strong> {review.adminResponse}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Ngày trả lời:</strong>{' '}
                          {review.replyDate ? formatDate(review.replyDate) : '-'}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Chưa có phản hồi từ admin</strong>
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                      <strong>Ngày gửi đánh giá:</strong> {formatDate(review.createdAt)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <ModalFeedback feedbackId={feedbackId} open={open} handleClose={onClose} />
    </Stack>
  )
}

// Giả sử rằng Review là một type mô tả cấu trúc của mỗi đánh giá
interface Review {
  id: string
  rating: number
  comment: string
  adminResponse: string | null
  replyDate: string | null
  userId: string
  rentalId: string
  createdAt: string
  updatedAt: string
}

// Giả sử formatDate là một hàm dùng để định dạng ngày
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export { AdminReviews }
